import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageApp } from 'src/app/config/data-table.language';
import { Store } from '@ngrx/store';
import * as moment from 'moment-timezone';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

// Models
import { BusinessLineModel } from 'src/app/models/business-line.model';
import { CoinModel } from 'src/app/models/coin.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { MedicalActAttentionModel} from '../../models/main/medical-act.model';
import { SpecialtyModel } from 'src/app/models/specialty.model';
import { TariffModel } from 'src/app/models/tariff.model';
import { PaymentMethodModel } from 'src/app/models/payment-method.model';

// Services
import { BusinessLineService } from 'src/app/service/business-line.service';
import { CoinService } from 'src/app/service/coin.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { MedicalActAttentionService } from '../../service/main/medical-act-attention.service';
import { MedialAttentionService } from 'src/app/service/main/medial-attention.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { TariffService } from 'src/app/service/tariff.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { ProgramationService } from 'src/app/service/programation.service';

@Component({
  selector: 'app-attention',
  templateUrl: './attention.component.html',
  styleUrls: ['./attention.component.scss']
})
export class AttentionComponent implements OnInit {

  @Input() idreservation: number;
  medicalact: any;
  total = 0;

  dtOptions: DataTables.Settings = {};
  formInput: MedicalActAttentionModel;
  list: MedicalActAttentionModel[] = [];

  coinList: CoinModel[] = [];
  pmList: PaymentMethodModel[] = [];
  blList: BusinessLineModel[] = [];
  loadingBl = false;
  specialtyList: SpecialtyModel[] = [];
  loadingSpecialty = false;
  tariffList: TariffModel[] = [];
  loadingTariff = false;
  doctorList: DoctorModel[] = [];
  loadingDoctor = false;
  coin = 'S/';
  session: any = {};
  reservation: any;

  constructor(
    private maaService: MedicalActAttentionService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private blService: BusinessLineService,
    private specialtyService: SpecialtyService,
    private tariffService: TariffService,
    private doctorService: DoctorService,
    private store: Store<{session: any}>,
    private maService: MedialAttentionService,
    private reservService: ProgramationService,
    private coinService: CoinService,
    private pmService: PaymentMethodService
  ) { }

  ngOnInit(): void {
    this.reset();
    this.getBl();
    this.getSession();
    this.getList();
    this.getReservation();
    this.getCoins();
    this.getPaymentMethod();
  }

  reset(): void{
    this.formInput = {
      medicalact: this.maService.idmedicalact,
      businessline: '',
      specialty: '',
      tariff: '',
      quantity: 1,
      doctor: '',
      user: '',
      date: moment().tz('America/Lima').format('YYYY-MM-DD'),
      patient: '',
      co: 1,
      value: 0,
      lab_cost: 0,
      idpaymentmethod: 1,
      commission: 0
    };
  }

  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      if (sess.id){
        this.session = sess;
        this.formInput.user = sess.id;
      }
    });
  }

  getReservation(): void{
    this.reservService.getOne(this.idreservation)
    .subscribe(
      (res: any) => {
        this.reservation = res;
        this.formInput.patient = res.idpatient;
        this.getDoctors();
      },
      err => {
        console.error('Error al obtener los datos de la reservación');
      }
    );
  }

  getList(): void{
    this.list = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this.maaService.getByMedicalAct(this.formInput.medicalact)
    .subscribe(
      res => {
        this.list = res;
      },
      error => {
        console.log('Error al obtener la lista de atenciones');
      }
    );
  }

  /**
   * List of Business linea <Linea de negocio>
   */
   getBl(): void{
    this.blList = [];
    this.loadingBl = true;
    this.blService.getAll()
    .subscribe(
      res => {
        this.loadingBl = false;
        this.blList = res;
      },
      err => {
        this.loadingBl = false;
        console.log(err.error);
      }
    );
  }

  /**
   * List of Specialtys <Especialidades>
   */
  getSpecialtys(): void{
    this.formInput.specialty = '';
    this.specialtyList = [];
    this.loadingSpecialty = true;
    this.specialtyService.getByBusinessLine(this.formInput.businessline)
    .subscribe(
      res => {
        this.specialtyList = res;
        this.loadingSpecialty = false;
      },
      err => {
        this.loadingSpecialty = false;
        console.log(err.error);
      }
    );
  }

  /**
   * List of tariff <Tarifario o tratamiento>
   */
  getTariff(): void{
    this.loadingTariff = true;
    this.formInput.tariff = '';
    this.tariffList = [];
    this.tariffService.getBySpecialty(this.formInput.specialty)
    .subscribe(
      res => {
        this.tariffList = res;
        this.loadingTariff = false;
      },
      err => {
        this.loadingTariff = false;
        console.log(err.error);
      }
    );
  }

  getDoctors(): void{
    this.doctorList = [];
    this.doctorService.getAll()
    .subscribe(
      res => {
        const { iddoctor } = this.reservation;
        this.doctorList = res;
        this.formInput.doctor = iddoctor;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  onSubmit(): void{
    this.spinner.show();
    if (this.formInput.quantity <= 0){
      this.spinner.hide();
      this.toastr.warning('La cantidad debe ser mayor a cero', 'Atención', {timeOut: 3000, progressBar: true});
      return;
    }
    if (this.formInput.id > 0){// update
      this.maaService.update(this.formInput, this.formInput.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Atención editada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.reset();
          this.getList();
          this.formInput.doctor = this.reservation.doctor.id;
          this.formInput.patient = this.reservation.idpatient;
          this.formInput.user = this.session.id;
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al editar la atención!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }else{// insert
      this.maaService.insert(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Atención agregada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.reset();
          this.getList();
          this.formInput.doctor = this.reservation.doctor.id;
          this.formInput.patient = this.reservation.idpatient;
          this.formInput.user = this.session.id;
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al registrar la atención!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }
  }

  setItem(data: any): void{
    this.formInput.id = data.id;
    this.formInput.date = data.date;
    this.formInput.quantity = data.quantity;
    this.formInput.value = data.value;
    this.formInput.doctor = data.doctor.id;
    this.formInput.businessline = data.tariff.specialty.businessLines.id;
    this.getSpecialtys();
    this.formInput.specialty = data.tariff.specialty.id;
    this.getTariff();
    this.formInput.tariff = data.tariff.id;
    this.total = data.quantity * data.value;
    this.formInput.co = data.co.id;
    this.formInput.idpaymentmethod = data.idpaymentmethod;
    this.formInput.lab_cost = data.lab_cost;
  }

  delete(data: any): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la atención?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this.maaService.delete(data.id)
        .subscribe(
          res => {
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
            this.getList();
            this.formInput.doctor = this.reservation.doctor.id;
            this.formInput.patient = this.reservation.idpatient;
            this.formInput.user = this.session.id;
          },
          err => {
            Swal.fire('Error!', 'No se puedo borrar la atención', 'error');
          }
        );
      }
    });
  }

  setMonto(): void{
    const tariff = this.formInput.tariff;
    const valor = this.tariffList.find(it => it.id === tariff);
    if (this.formInput.value <= 0){
      this.formInput.value = valor.price_sol > 0 ? valor.price_sol : valor.price_usd;
    }
    this.coin = valor.price_sol > 0 ? 'S/' : '$';
    this.total = Number((this.formInput.quantity * this.formInput.value).toFixed(2));
  }

  getCoins(): void{
    this.coinList = [];
    this.coinService.getAll()
    .subscribe(
      res => {
        this.coinList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  getPaymentMethod(): void{
    this.pmList = [];
    this.pmService.getAll()
    .subscribe(
      res => {
        this.pmList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  setComision(): void{
    const comi = this.pmList.filter(el =>  el.id === this.formInput.idpaymentmethod);
    this.formInput.commission = comi[0].commission;
  }
}
