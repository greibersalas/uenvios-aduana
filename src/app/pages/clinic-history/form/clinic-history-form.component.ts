import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbCarousel, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
// Load the full build.
import * as _ from 'lodash';

// MODELS
import { CampusModel } from 'src/app/models/campus.model';
import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';
import { DeparmentsModel } from 'src/app/models/deparments.model';
import { DistrictsModel } from 'src/app/models/districts.model';
import { FormInput } from '../../../models/main/clinicHistory.model';
import { ProvinceModel } from 'src/app/models/province.model';

// SERVICES
import { CampusService } from 'src/app/service/campus.service';
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { DeparmentsService } from '../../../service/deparments.service';
import { DistrictsService } from 'src/app/service/districts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProvinceService } from '../../../service/province.service';
import { ReservationService } from 'src/app/service/main/reservation.service';

// COMPONENTS
import { AddOdontogramaComponent } from '../../../components/add-odontograma/add-odontograma.component';


@Component({
  selector: 'app-clinic-history-form',
  templateUrl: './clinic-history-form.component.html',
  styleUrls: ['./clinic-history-form.component.scss']
})
export class ClinicHistoryFormComponent implements OnInit {

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  @Input() id: number;
  active = 1;
  disabled = true;
  public validCampus = false;
  public validDistrict = false;

  public processing = false;
  public isSubmit: boolean;

  campusList: CampusModel[] = [];
  deparmenList: DeparmentsModel[] = [];
  deparment: any = null;
  provinceList: ProvinceModel[] = [];
  province: any = null;
  districList: DistrictsModel[] = [];
  formInput: FormInput;
  form: any;
  odontogramas: any[] = [];
  attentions: any[] = [];
  title = '';
  listQuotes: any[] = [];
  listTypeDocument: any[] = [];

  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private campusService: CampusService,
    private chService: ClinicHistoryService,
    private deparmentService: DeparmentsService,
    private districtsService: DistrictsService,
    private modalSerive: NgbModal,
    private provinceService: ProvinceService,
    private reservService: ReservationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.clear();
    if (this.id > 0){
      this.disabled = false;
      this.get();
    }else{
      this.getCampus();
      // this.getDistrics();
      this.getDeparments(0, 0);
    }
    this.listTypeDocument = [
      {id: 'DNI', name: 'DNI'},
      {id: 'RUC', name: 'RUC'},
      {id: 'CE', name: 'CE'},
      {id: 'PAS', name: 'Pasaporte'}
    ];
  }

  get(): void{
    this.spinner.show();
    this.chService.getOne(this.id)
    .subscribe(
      res => {
        this.formInput = res;
        this.title = `${res.history} | ${res.name} | ${res.documentNumber}`;
        this.getCampus();
        if (res.district == null){
          this.getDeparments(0, 0);
        }else{
          this.getDeparments(Number(res.district.provinces.deparments.id), Number(res.district.provinces.id));
        }
        // this.getDistrics();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  clear(): void{
    this.formInput = {
      id: 0,
      date: moment().format('YYYY-MM-DD'),
      campus: '',
      client: 2,
      name: '',
      lastNameFather: '',
      lastNameMother: '',
      address: '',
      district : null,
      documentNumber: '',
      phone: '',
      email: '',
      relationship: '',
      history: '',
      birthdate: null,
      vip: false,
      sex: '',
      ruc: '',
      country: '',
      cellphone: '',
      studyCenter: '',
      knowledge: '',
      referred: '',
      placeOrigen: '',
      birthPlace: '',
      previousAttentions: '',
      insuranceCarrier: 2,
      history_correlative: 0,
      attorney: '',
      invoise_type_document: 'DNI',
      invoise_num_document: ''
    };
  }

  setHistory(): void{
    this.spinner.show();
    // Formato MX-idsede-YY-correlativo
    if (this.formInput.id === 0){
      this.chService.getLastHistoryNumber(this.formInput.campus)
      .subscribe(
        res => {
          const history = `MX${this.formInput.campus}${moment().format('YY')}-${String(res + 1).padStart(6, '0')}`;
          this.formInput.history = history;
          this.formInput.history_correlative = res + 1;
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ha ocurrido un error al obtener el número de historia clinica',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }
  }

  save(form: any): void{
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      this.processing = true;
      if (this.formInput.id === 0){
        // insert new clinic history
        const data: ClinicHistoryModel = {
          id: this.formInput.id,
          campus: this.formInput.campus,
          history: this.formInput.history,
          name: this.formInput.name,
          client: this.formInput.client,
          lastNameFather: this.formInput.lastNameFather,
          lastNameMother: this.formInput.lastNameMother,
          address: this.formInput.address,
          district: this.formInput.district,
          documentNumber: this.formInput.documentNumber,
          phone: this.formInput.phone,
          email: this.formInput.email,
          date: this.formInput.date,
          cellphone: this.formInput.cellphone,
          relationship: this.formInput.relationship,
          birthdate: this.formInput.birthdate,
          vip: this.formInput.vip,
          sex: this.formInput.sex,
          ruc: this.formInput.ruc,
          country: this.formInput.country,
          studyCenter: this.formInput.studyCenter,
          knowledge: this.formInput.knowledge,
          referred: this.formInput.relationship,
          placeOrigen: this.formInput.placeOrigen,
          birthPlace: this.formInput.birthPlace,
          previousAttentions: this.formInput.previousAttentions,
          insuranceCarrier: this.formInput.insuranceCarrier,
          history_correlative: this.formInput.history_correlative,
          attorney: this.formInput.attorney,
          invoise_type_document: this.formInput.invoise_type_document,
          invoise_num_document: this.formInput.invoise_num_document
        };
        this.chService.insert(data)
        .subscribe(
          res => {
            this.processing = false;
            this.toastr.success('Historia clinica insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.formInput.id = res.id;
            this.disabled = false;
            // this.clear();
            // this.activeModal.close('Save click');
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar la historia clinica.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if (this.formInput.id > 0){
        const data: ClinicHistoryModel = {
          id: this.formInput.id,
          campus: this.formInput.campus,
          // history: this.formInput.history,
          name: this.formInput.name,
          client: this.formInput.client,
          lastNameFather: this.formInput.lastNameFather,
          lastNameMother: this.formInput.lastNameMother,
          address: this.formInput.address,
          district: this.formInput.district,
          documentNumber: this.formInput.documentNumber,
          phone: this.formInput.phone,
          email: this.formInput.email,
          // date: this.formInput.date,
          cellphone: this.formInput.cellphone,
          relationship: this.formInput.relationship,
          birthdate: this.formInput.birthdate,
          vip: this.formInput.vip,
          sex: this.formInput.sex,
          ruc: this.formInput.ruc,
          country: this.formInput.country,
          studyCenter: this.formInput.studyCenter,
          knowledge: this.formInput.knowledge,
          referred: this.formInput.relationship,
          placeOrigen: this.formInput.placeOrigen,
          birthPlace: this.formInput.birthPlace,
          previousAttentions: this.formInput.previousAttentions,
          insuranceCarrier: this.formInput.insuranceCarrier,
          history_correlative: this.formInput.history_correlative,
          attorney: this.formInput.attorney,
          invoise_type_document: this.formInput.invoise_type_document,
          invoise_num_document: this.formInput.invoise_num_document
        };
        this.chService.update(data, this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.toastr.success('Historia clinica editada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar la historia clinica.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }
    }
  }

  getCampus(): void{
    this.campusList = [];
    this.campusService.getAll()
    .subscribe(
      res => {
        res.forEach((campus: CampusModel) => {
          this.campusList.push(campus);
        });
        if (this.formInput.campus.id){
          this.formInput.campus = this.formInput.campus.id;
          this.validateCampus();
        }else{
          this.formInput.campus = '';
        }
      },
      err => {
        console.log(err.error);
      }
    );
  }

  getDeparments(iddeparment: number, idprovince: number): void{
    this.deparmenList = [];
    this.deparmentService.getAll()
    .subscribe(
      res => {
        this.deparmenList = res;
        if (idprovince > 0){
          this.deparment = iddeparment;
          this.getProvices(idprovince);
        }
      },
      err => {
        console.log(err.error);
      }
    );
  }

  getProvices(idprovince: number): void{
    this.provinceList = [];
    this.province = '';
    this.provinceService.getByDeparment(Number(this.deparment))
    .subscribe(
      res => {
        this.provinceList = res;
        if ( idprovince > 0){
          this.province = idprovince;
          this.getDistrics();
        }
      },
      err => {
        console.log(err.error);
      }
    );
  }

  getDistrics(): void{
    this.districList = [];
    // this.formInput.district = '';
    this.districtsService.getByProvince(Number(this.province))
    .subscribe(
      res => {
        this.districList = res;
        if (this.formInput.district.id > 0){
          this.formInput.district = this.formInput.district.id;
          this.validateDistrict();
        }else{
          this.formInput.district = '';
        }
      },
      err => {
        console.log(err.error);
      }
    );
  }

  validateCampus(): void{
    if (this.formInput.campus.id === null){
      this.validCampus = false;
    }else{
      this.validCampus = true;
    }
  }

  validateDistrict(): void{
    if (this.formInput.district.id === null){
      this.validDistrict = false;
    }else{
      this.validDistrict = true;
    }
  }

  getOdontogramas(): void{
    this.odontogramas = [];
    this.chService.getOdontograma(this.formInput.id)
    .subscribe(
      res => {
        res.forEach((item: any) => {
          this.odontogramas.push(item);
        });
        // this.carousel.pause();
      },
      error => {}
    );
  }

  getReservations(): void{
    this.spinner.show();
    this.listQuotes = [];
    this.reservService.getByClinicHistory(this.formInput.id).subscribe(
      res => {
        res.forEach((it: any) => {
          this.listQuotes.push(it);
        });
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        console.error('Error a buscar los reservas');
      }
    );
  }

  addOdontograma(): void{
    const modal = this.modalSerive.open(AddOdontogramaComponent, {size: 'xl'});
    modal.result.then((result: any) => {
      if (result.ok){
        this.getOdontogramas();
      }
    });
    modal.componentInstance.data = this.formInput;
    modal.componentInstance.origin = 'CH';
  }

  validateDocumentNumber(): void{
    this.chService.validateNumDoc(this.formInput.documentNumber)
    .subscribe(
      res => {
        if (res){
          this.formInput.documentNumber = '';
          this.toastr.warning(
            'El número de documento ya éxiste',
            'Atención',
            {timeOut: 4000, progressBar: true, closeButton: true}
          );
        }
      },
      err => {
        this.toastr.error(
          'Ocurrio un error al validar el número de documento',
          'Atención',
          {timeOut: 4000, progressBar: true, closeButton: true}
        );
      }
    );
  }
}
