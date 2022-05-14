import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
// Load the full build.
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

import { BusinessLineModel } from 'src/app/models/business-line.model';
import { CoinModel } from 'src/app/models/coin.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { SpecialtyModel } from 'src/app/models/specialty.model';
import { TariffModel } from 'src/app/models/tariff.model';
import { QuotationDetailModel } from 'src/app/models/main/quotation-detail.model';
import { QuotationModel } from 'src/app/models/main/quotation.model';
import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { CoinService } from 'src/app/service/coin.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { TariffService } from 'src/app/service/tariff.service';
import { BusinessLineService } from 'src/app/service/business-line.service';
import { AddOdontogramaComponent } from '../../../components/add-odontograma/add-odontograma.component';
import { QuotationService } from 'src/app/service/main/quotation.service';
import { FormInput, FormDetail, QuotationDetail } from '../quotation.model';
import { ClinicHistoryFormComponent } from '../../clinic-history/form/clinic-history-form.component';


@Component({
  selector: 'app-quotation-form',
  templateUrl: './quotation-form.component.html',
  styleUrls: ['./quotation-form.component.scss']
})
export class QuotationFormComponent implements OnInit {

  @Input() id: number;

  public isSubmit: boolean;
  public processing: boolean = false;
  loadingSelect: boolean = false;
  loadingBl: boolean = false;
  loadingSpecialty: boolean = false;


  formInput: FormInput;
  formInputDetail: QuotationDetailModel;
  details: QuotationDetailModel[] = [];

  specialtyList: SpecialtyModel[] = [];
  tariffList: TariffModel[]= [];

  patientList: ClinicHistoryModel[] = [];
  coinList: CoinModel[] = [];
  blList: BusinessLineModel[] = [];
  doctorList: DoctorModel[] = [];

  validCoin: boolean = false;
  validBl: boolean = false;
  validDoctor: boolean = false;
  validSpecialty: boolean = false;

  disabled: boolean = false;
  total_sol: number = 0;
  total_usd: number = 0;
  showCoin: boolean = false;
  coinDet: string = '';

  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal,
    private toastr: ToastrService,private _chService: ClinicHistoryService,
    private _coinService: CoinService, private _specialtyService: SpecialtyService,
    private _doctorService: DoctorService, private _tariffService: TariffService,
    private _blService: BusinessLineService,private _modalSerive: NgbModal,
    private _quotationService: QuotationService,private spinner: NgxSpinnerService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getLists();
    this.tariffList.push({id: 0, name: 'Seleccione Especialidad', price_sol: 0, price_usd: 0, odontograma: false, bracket: false});
    this.clear();
    this.clearDetail();
    if(this.id > 0){
      this.getOne();
    }
  }

  getOne(){
    this._quotationService.getOne(this.id).subscribe(
      res => {
        this.formInput = res;
        this.formInput.document_number = res.clinicHistory.documentNumber;
        this.onKey('e');
        this.getDetail(res.id);
        this.disabled = true;
        this.formInput.doctor = res.doctor.id;
        this.formInput.specialty = this.specialtyList[0];
        this.formInput.bl = this.blList[0];
        //Busco si tiene odontograma
        this._chService.getOdontogramaByQuotation(this.id)
        .subscribe(
          res => {
            if(res){
              this.formInput.specialty.odontograma = true;
              this.formInput.odontograma = res.name;
            }
          },
          err => {
            console.log("Error al obtener el odontograma");
          }
        );
      },
      err => {
        console.error("Error al buscar la cotización");
      }
    );
  }

  clear(){
    this.specialtyList.push({id: 0,name: 'Seleccione Linea de Negocio'});
    this.formInput = {
      id: 0,
      date: moment().format('YYYY-MM-DD'),
      document_number: '',
      patient: '',
      cellphone: '',
      age: 0,
      bl: this.blList[0],
      specialty: this.specialtyList[0],
      doctor: '',
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
      odontograma: false,
      history: ''
    };
  }

  clearDetail(): void{
    this.formInputDetail = {
      id: 0,
      tariff: this.tariffList[0],
      quantity: 1,
      price: 0,
      porce_discount: false,
      discount: 0,
      total: 0,
      coin: '',
      state: 1
    }
  }

  getLists(): void{
    this.getPatients();
    this.getBl();
    this.getCoins();
    this.getDoctors();
    this.details = [];
  }

  addItem(): void{
    if(this.formInput.bl.id === 0){
      this.toastr.warning('Debe Seleccionar una Linea de Negocio','Atencion',{timeOut: 3000, progressBar: true});
      return;
    }
    if(this.formInput.specialty.id === 0){
      this.toastr.warning('Debe Seleccionar una specialidad','Atencion',{timeOut: 3000, progressBar: true});
      return;
    }
    if(this.formInputDetail.tariff.id === 0){
      this.toastr.warning('Debe Seleccionar un tratamiento','Atencion',{timeOut: 3000, progressBar: true});
      return;
    }
    if(this.formInputDetail.price <= 0){
      this.toastr.warning('El precio debe ser mayor a cero (0)','Atencion',{timeOut: 3000, progressBar: true});
      return;
    }
    if(this.formInputDetail.quantity <= 0){
      this.toastr.warning('La cantidad debe ser mayor a cero (0)','Atencion',{timeOut: 3000, progressBar: true});
      return;
    }
    this.spinner.show();
    const tariffDet = this.formInputDetail.tariff.id;
    const tariffExist = _.find(this.details,function(d){ return d.tariff.id === tariffDet})
    if(tariffExist){
      this.spinner.hide();
      this.toastr.warning('EL tratamiento ya fue agregado','Atencion',{timeOut: 3000, progressBar: true});
      return;
    }
    if(this.formInput.id > 0){
      this.formInputDetail.quotation = this.formInput.id;
      this._quotationService.addItem(this.formInputDetail).subscribe(
        res => {
          this.getDetail(this.formInput.id);
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al agregar el item',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
          return;
        }
      );
    }else{
      this.details.push(this.formInputDetail);
    }
    this.clearDetail();
    this.calculate();
    this.spinner.hide();
  }

  getDetail(id: number): void{
    this.details = [];
    this.total_usd = 0;
    this.total_sol = 0;
    this._quotationService.getDetail(id)
    .subscribe(
      res => {
        res.forEach((det:QuotationDetailModel) => {
          det.coin = det.coin.id;
          this.details.push(det);
          if(det.coin === 1){
            this.total_sol += det.total;
          }else if(det.coin === 2){
            this.total_usd += det.total;
          }
        });
      },
      error => {
        console.error("Error detail ",error.error);
      }
    );
  }

  removeItem(index: number,id: number): void{
    this.spinner.show();
    if(this.formInput.id > 0){
      this._quotationService.deleteItem(id).subscribe(
        res => {
          this.getDetail(this.formInput.id);
          this.spinner.hide();
          this.toastr.success(
            'Item borrado',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al borrar el item',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }else{
      this.details.splice(index,1);
      this.toastr.success(
        'Item borrado',
        'Ok!',
        {timeOut: 3000, progressBar: true}
      );
      this.calculate();
      this.spinner.hide();
    }
  }

  getPatients(){
    this.patientList = [];
    this._chService.getAll()
    .subscribe(
      res =>{
        res.forEach((it:ClinicHistoryModel) => {
          this.patientList.push(it);
        });
      },
      err => {
        console.log(err.error);
      }
    );
  }

  getCoins(){
    this.coinList = [];
    this.coinList.push({id: '', name: 'Seleccione',description: '', code: ''});
    this._coinService.getAll()
    .subscribe( 
      res =>{
        res.forEach((it:CoinModel) => {
          this.coinList.push(it);
        });
        /* if(this.data.coin.id > 0){
          const index = _.findIndex(this.coinList,{ id : this.data.coin.id});
          this.formInput.coin = this.coinList[index];
        }else{
          this.formInput.coin = this.coinList[0];
        } */
      }, 
      err => {
        console.log(err.error);
      }
    );
  }

  validateCoin(){
    if(this.formInputDetail.coin.id === ''){
      this.validCoin = false;
    }else{
      this.validCoin = true;
    }
  }

  getTariff(){
    this.loadingSelect = true;
    this.tariffList = [];
    this._tariffService.getBySpecialty(this.formInput.specialty.id)
    .subscribe(
      res =>{
        this.tariffList.push({id: 0, name: 'Seleccione', price_sol: 0, price_usd: 0, odontograma: false, bracket: false});
        res.forEach((it:TariffModel) => {
          this.tariffList.push(it);
        });
        this.formInputDetail.tariff = this.tariffList[0];
        this.loadingSelect = false;
      },
      err => {
        this.loadingSelect = false;
        console.log(err.error);
      }
    );
  }

  setTariff(): void{
    //if(this.formInputDetail.coin.code === 'PEN'){
      this.showCoin = false;
    if(this.formInputDetail.tariff.price_sol > 0){
      this.formInputDetail.coin = '1';
      this.formInputDetail.price = this.formInputDetail.tariff.price_sol;
      this.coinDet = 'S/';
    }else if(this.formInputDetail.tariff.price_usd > 0){
      this.formInputDetail.coin = '2';
      this.formInputDetail.price = this.formInputDetail.tariff.price_usd;
      this.coinDet = '$';
    }else{
      this.formInputDetail.coin = '';
      this.formInputDetail.price = 0;
      this.formInputDetail.coin = '1';
      this.showCoin = true;
    }
    this.calculateDetail();
  }

  calculateDetail(): void{
    let subtotal: number = this.formInputDetail.price * this.formInputDetail.quantity;
    if(this.formInputDetail.porce_discount){
      //
      this.formInputDetail.total = subtotal - ((subtotal * this.formInputDetail.discount) / 100 );
    }else{
      this.formInputDetail.total = subtotal - this.formInputDetail.discount;
    }
  }

  calculate(): void{
    this.total_sol = 0;
    this.total_usd = 0;
    this.details.forEach((item:FormDetail) => {
      if(item.coin === '1' || item.coin === 1){
        this.total_sol += item.total;
      }else if(item.coin === '2' || item.coin === 2){
        this.total_usd += item.total;
      }
    });
  }

  /**
   * List of Business linea <Linea de negocio>
   */
  getBl(){
    this.blList = [];
    this.loadingBl = true;
    this._blService.getAll()
    .subscribe( 
      res =>{
        this.loadingBl = false;
        this.blList.push({id:0,name:'Seleccione'});
        res.forEach((bl: BusinessLineModel) => {
          this.blList.push(bl);
        });
        /* if(this.id > 0){
          const index = _.findIndex(this.blList,{ id : this.formInput.businessLine.id});
          this.formInput.bl = this.blList[index];
          this.getSpecialtys();
        }else{ */
          this.formInput.bl = this.blList[0];
        //}    
      }, 
      err => {
        this.loadingBl = false;
        console.log(err.error);
      }
    );
  }

  validateBl(){
    if(this.formInput.bl.id === null){
      this.validBl = false;
    }else{
      this.validBl = true;
    }
  }

  getSpecialtys(){
    this.specialtyList = [];
    this.loadingSpecialty = true;
    this._specialtyService.getByBusinessLine(this.formInput.bl.id)
    .subscribe( 
      res =>{
        this.loadingSpecialty = false;
        this.specialtyList.push({id: 0,name: 'Seleccione'});
        res.forEach((it:SpecialtyModel) => {
          this.specialtyList.push(it);
        });
        /* if(this.id > 0){
          const index = _.findIndex(this.specialtyList,{ id : this.formInput.specialty.id});
          this.formInput.specialty = this.specialtyList[index];
          this.getTariff();
        }else{ */
          this.formInput.specialty = this.specialtyList[0];
        //}
      }, 
      err => {
        this.loadingSpecialty = false;
        console.log(err.error);
      }
    );
  }

  validateSpecialty(){
    if(this.formInput.specialty.id === null){
      this.validSpecialty = false;
    }else{
      this.validSpecialty = true;
    }
  }

  getDoctors(){
    this.doctorList = [];
    this._doctorService.getAll()
    .subscribe( 
      res =>{
        res.forEach((it:DoctorModel) => {
          this.doctorList.push(it);
        });
        /* if(this.id > 0){
          const index = _.findIndex(this.doctorList,{ id : this.formInput.doctor.id});
          this.formInput.doctor = this.doctorList[index];
        }else{
          this.formInput.doctor = '';
        } */
      }, 
      err => {
        console.log(err.error);
      }
    );
  }

  validateDoctor(){
    if(this.formInput.doctor.id === null){
      this.validDoctor = false;
    }else{
      this.validDoctor = true;
    }
  }

  onKey(e:any){
    this.formInput.patient = '';
    this.formInput.cellphone = '';
    this._chService.getByDocument(this.formInput.document_number)
    .subscribe(
      res => {
        const indexPatient = _.findIndex(this.patientList, { id: res.id });
        this.formInput.patient = this.patientList[indexPatient];
        this.formInput.cellphone = res.cellphone;
        this.formInput.age = moment().diff(res.birthdate, 'years');
        this.formInput.history = res.history;
        //this.disabled = true;
        this.toastr.success('Paciente encontrado!!', 'Ok!', {
          timeOut: 3000,
        });
      },
      error =>{
        if(error.error.statusCode === 404){
          this.toastr.warning('No hay paciente registrado con el número de documento suministrado!!', 'Atención!', {
            timeOut: 3000,
          });
        }else{
          this.toastr.error('Ocurrio un error al buscar el cliente!!', 'Atención!', {
            timeOut: 3000,
          });
        }
      }
    );
  }

  selectPatient(){
    this.formInput.cellphone = this.formInput.patient.cellphone;
    this.formInput.age = moment().diff(this.formInput.patient.birthdate, 'years');
    this.formInput.document_number = this.formInput.patient.documentNumber;
    this.formInput.history = this.formInput.patient.history;
  }

  odontograma(): void{
    const modal = this._modalSerive.open(AddOdontogramaComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result.ok){
        //Cargamos la información del odontograma
        this.formInput.odontograma = result.odontograma;
        //Insertamos el detalle
        result.detail.forEach((item:QuotationDetail) => {
          this.formInputDetail = {
            id: 0,
            tariff: item.tariff,
            quantity: item.quantity,
            price: item.tariff.price_sol > 0 ? item.tariff.price_sol : item.tariff.price_usd,
            porce_discount: false,
            discount: 0,
            total: item.tariff.price_sol > 0 ? (item.quantity*item.tariff.price_sol) : (item.quantity*item.tariff.price_usd),
            coin: item.tariff.price_sol > 0 ? 1 : 2
          }
          this.addItem();
        });
      }
    });
    modal.componentInstance.data = this.formInput.patient;
    modal.componentInstance.origin = 'QT';
    modal.componentInstance.odontograma = this.formInput.odontograma;
  }

  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else if(this.details.length === 0){
      this.toastr.warning('Debe agregar un tratamiento a la cotización','Atención',{timeOut: 3000, progressBar: true});
      return;
    }else{
      this.spinner.show();
      //console.log(this.formInput);
      this.processing = true;
      if(this.formInput.id === 0){
        //insert new campus
        const params: QuotationModel = {
          date: this.formInput.date,
          clinicHistory: this.formInput.patient,
          businessLine: this.formInput.bl.id,
          specialty: this.formInput.specialty,
          doctor: this.formInput.doctor,
          subtotal: this.formInput.subtotal,
          tax: this.formInput.tax,
          discount: this.formInput.discount,
          total: this.formInput.total,
          detail: this.details,
          odontograma: this.formInput.odontograma
        };
        this._quotationService.insert(params)
        .subscribe(
          res => {
            this.spinner.hide();
            this.processing = false;
            this.toastr.success('Cotización insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.activeModal.close('Save click');
          },
          err =>{
            this.spinner.hide();
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar la cotización.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        //console.log(this.formInput.patient);
        const params: QuotationModel = {
          date: this.formInput.date,
          clinicHistory: this.formInput.patient,
          businessLine: this.formInput.bl.id,
          specialty: this.formInput.specialty,
          doctor: this.formInput.doctor,
          subtotal: this.formInput.subtotal,
          tax: this.formInput.tax,
          discount: this.formInput.discount,
          total: this.formInput.total,
          detail: this.details
        };
        this._quotationService.update(params,this.formInput.id)
        .subscribe(
          res => {
            this.spinner.hide();
            this.processing = false;
            this.clear();
            this.toastr.success('Cotización editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.activeModal.close('Save click');
          },
          err => {
            this.spinner.hide();
            this.processing = false;
            this.toastr.success('Cotización editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            console.log(err.error);
            //Pendiente corregir
            /* this.toastr.error('Atención, ha ocurrido un error al editar la cotización.', 'Error!', {
              timeOut: 3000,
            }); */
            this.activeModal.close('Save click');
          }
        )
      }
    }
  }

  getClinicHistory(): void{
    const modal = this._modalSerive.open(ClinicHistoryFormComponent,{size: 'xl'});
    modal.componentInstance.data = this.formInput.patient;
  }

  /**Edit item */
  calculateItem(i: number){
    let subtotal: number = (this.details[i].price * this.details[i].quantity);
    if(this.details[i].porce_discount){
      //
      this.details[i].total = subtotal - ((subtotal * this.details[i].discount) / 100 );
    }else{
      this.details[i].total = subtotal - this.details[i].discount;
    }
    //this.details[i].total = (this.details[i].price * this.details[i].quantity) - this.details[i].discount;
  }
  updateItem(item: QuotationDetailModel){
    if(item.id > 0){
      this._quotationService.updateItem(item.id, item)
      .subscribe(
        res => {
          this.getDetail(this.formInput.id);
          this.toastr.success(
            'Item actualizado',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
        },
        err => {
          this.toastr.success(
            'Ocurrio un problema actualizando el item',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }
  }
  /**Edit item */

}
