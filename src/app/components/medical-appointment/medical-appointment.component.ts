import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// Load the full build.
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { EnvironmentDoctorModel } from 'src/app/models/environment-doctor.model';
import { ProgramationModel } from 'src/app/models/programation.model';
import { TariffModel } from 'src/app/models/tariff.model';

import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { EnvironmentDoctorService } from 'src/app/service/environment-doctor.service';
import { ProgramationService } from 'src/app/service/programation.service';
import { TariffService } from 'src/app/service/tariff.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-medical-appointment',
  templateUrl: './medical-appointment.component.html',
  styleUrls: ['./medical-appointment.component.scss']
})
export class MedicalAppointmentComponent implements OnInit {

  @Input() data: any;

  formInput: ProgramationModel;
  formInputOld: ProgramationModel;
  listPatient: ClinicHistoryModel[]=[];
  loadingSelectPatient: boolean = false;
  loadingSelectTariff: boolean = false;
  loadingSelectDoctor: boolean = false;
  loadingSelectDoctor2: boolean = false;
  listTariff: TariffModel[]=[];
  listDoctors: DoctorModel[]=[];
  listDoctors2: DoctorModel[] = [];
  environmentList: EnvironmentDoctorModel[]=[];
  title: string = 'Nueva Cita';
  reprograming: boolean = false;

  //Autocomplet
  searching = false;
  searchFailed = false;
  patient: string = '';

  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService,
    config: NgbModalConfig,public activeModal: NgbActiveModal,
    private _servicePatient: ClinicHistoryService, private _serviceTariff: TariffService,
    private _serviceDoctor: DoctorService, private _edService: EnvironmentDoctorService,
    private _serviceReservation: ProgramationService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    if(this.data.acction){
      this.formInput = {
        environment: this.data.idenvironment,
        date: moment(this.data.date).format('YYYY-MM-DD'),
        appointment: `${this.data.appointment}`,
        reason: this.data.reason
      };
      this.get();
      this.title = 'Editar cita';
    }else{
      this.formInput = {
        environment: this.data.id,
        date: this.data.date,
        appointment: `${this.data.since}:00-${this.data.until}:00`,
        doctor_id2: null
      };
    }
    this.formInputOld = {
      environment: 0,
      date: '',
      appointment: ''
    };
    //this.getPatient();
    //this.getTariffs();
    this.getEnvironment();
    this.onGetDoctors2();
    if(sessionStorage.getItem('oldreservation')){
      this.title = 'Reprogramar cita';
      this.reprograming = true;
      this.get();
    }
  }

  getPatient(){
    this.loadingSelectPatient = true;
    this.listPatient = [];
    this._servicePatient.getAll()
    .subscribe(
      res =>{
        res.forEach((patient:ClinicHistoryModel) => {
          this.listPatient.push(patient);
        });
        this.loadingSelectPatient = false;
      },
      err => {
        this.loadingSelectPatient = false;
        console.log(err.error);
      }
    );
  }

  getTariffs(){
    this.loadingSelectTariff = true;
    this.listTariff = [];
    const environ = _.find(this.environmentList,{id:this.formInput.environment});
    this._serviceTariff.getByBl(environ.businessline)
    .subscribe(
      res =>{
        res.forEach((tariff:TariffModel) => {
          this.listTariff.push(tariff);
        });
        this.loadingSelectTariff = false;
      },
      err => {
        this.loadingSelectTariff = false;
        console.log(err.error);
      }
    );
  }

  getDoctors(){
    this.loadingSelectDoctor = true;
    this.listDoctors = [];
    const environ = _.find(this.environmentList,{id:this.formInput.environment});
    const day = moment(this.data.date).tz('America/Lima').day();
    this._serviceDoctor.getByBl(environ.businessline,day)
    .subscribe(
      res =>{
        //Busco si está disponible en el horario
        res.forEach(dr =>{
          let validate = true;
          //Validamos si el doctor esta en el horario de la mañana
          if(dr.morning_schedule){
            let morning_since: any;
            let morning_until: any;
            let time: any;
            if(this.data.acction && this.data.acction === 'edit'){
              morning_since = moment(`${this.formInput.date} ${this.data.appointment.split('-')[0]}`).tz('America/Lima');
              morning_until = moment(`${this.formInput.date} ${this.data.appointment.split('-')[1]}`).tz('America/Lima');
              time = moment(`${this.formInput.date} ${this.data.appointment.split('-')[0]}`).tz('America/Lima');
            }else{
              morning_since = moment(`${this.formInput.date} ${dr.morning_schedule.split('-')[0]}:00`).tz('America/Lima');
              morning_until = moment(`${this.formInput.date} ${dr.morning_schedule.split('-')[1]}:00`).tz('America/Lima');
              time = moment(`${this.formInput.date} ${this.data.since}:00`).tz('America/Lima');
            }
            if(time >= morning_since && time < morning_until){
              validate = false;
              this.listDoctors.push(dr);
            }
          }
          //Validamos si el doctor esta en el horario de la tarde
          if(dr.afternoon_schedule && validate){
            let afternoon_since: any;
            let afternoon_until: any;
            let time: any;
            if(this.data.acction && this.data.acction === 'edit'){
              afternoon_since = moment(`${this.formInput.date} ${this.data.appointment.split('-')[0]}`).tz('America/Lima');
              afternoon_until = moment(`${this.formInput.date} ${this.data.appointment.split('-')[1]}`).tz('America/Lima');
              time = moment(`${this.formInput.date} ${this.data.appointment.split('-')[0]}`).tz('America/Lima');
            }else{
              afternoon_since = moment(`${this.formInput.date} ${dr.afternoon_schedule.split('-')[0]}:00`).tz('America/Lima');
              afternoon_until = moment(`${this.formInput.date} ${dr.afternoon_schedule.split('-')[1]}:00`).tz('America/Lima');
              time = moment(`${this.formInput.date} ${this.data.since}:00`).tz('America/Lima');
            }
            if(time >= afternoon_since && time < afternoon_until){
              this.listDoctors.push(dr);
            }
          }
        });
        this.loadingSelectDoctor = false;
      },
      err => {
        this.loadingSelectDoctor = false;
        console.log(err.error);
      }
    );
  }

  /**
   * Obtenemos solo los doctores
   * OI del día
   */
  onGetDoctors2(): void{
    this.loadingSelectDoctor2 = true;
    this.listDoctors2 = [];
    this._serviceDoctor.getByBl([2],moment(this.data.date).day())
    .subscribe(
      res => {
        //Obtenemos solo los doc
        this.loadingSelectDoctor2 = false;
        this.listDoctors2 = res;
      },
      (err: HttpErrorResponse) => {
        this.loadingSelectDoctor2 = false;
        this.toastr.error(
          'Ocurrio un error al obtener los dotores de OI',
          'Ateción',
          {timeOut: 4000, progressBar: true, closeButton: true }
        );
      }
    );
  }

  getEnvironment(){
    this.environmentList = [];
    this._edService.getAll().subscribe(
      res => {
        this.environmentList = res;
        this.getDoctors();
        this.getTariffs();
      },
      err => {
        console.error("Error al obtener los consultorios");
      }
    );
  }

  addappointmentByPatient(){
    this.spinner.show();
    if(this.formInput.id > 0){
      this._serviceReservation.update(this.formInput,this.formInput.id).subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success(
            'La reprogramación fue registrada correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
          sessionStorage.removeItem('oldreservation');
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar la cita',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }else{
      this._serviceReservation.insert(this.formInput).subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success(
            'La reserva fue registrada correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
          this.activeModal.close('Save click');
        },
        (err: HttpErrorResponse) => {
          this.spinner.hide();
          if(err.status === 400){
            this.toastr.warning(
              err.error.message,
              'Atención',
              {timeOut: 3500, progressBar: true}
            );
          }else{
            this.toastr.error(
              'Ocurrio un error al registrar la cita',
              'Atención',
              {timeOut: 3500, progressBar: true}
            );
          }
        }
      );
    }
  }

  cancelRepro(){
    this.toastr.info(
      'Ok!','Reprogramación Cancelada',{timeOut: 3000, progressBar: true}
    );
    sessionStorage.removeItem('oldreservation');
    this.activeModal.close('Save click');
  }

  get(){
    let id: number;
    if(this.data.acction && this.data.acction === 'edit'){
      id = this.data.id;
    }else{
      id = Number(sessionStorage.getItem('oldreservation'));
    }
    this._serviceReservation.getOne(id)
    .subscribe(
      (res: any) => {
        this.formInput.id = res.id;
        this.formInput.patient = res.idpatient;
        this.patient = res.patient;
        this.formInput.doctor = res.iddoctor;
        this.formInput.doctor_id2 = res.iddoctor2;
        if(res.idtariff){
          this.formInput.tariff = res.idtariff;
        }
        //console.log("Datos de la reserva anterior", res);
        if(!this.data.acction){
          this.formInputOld = res;
          this.formInputOld = {
            environment: res.idenvironment,
            date: moment(res.date).format('YYYY-MM-DD'),
            appointment: res.appointment,
          };
        }
      },
      err => {
        console.log("Error al buscar la reserva");
      }
    );
  }

  validateDoctor(): void{
    this.spinner.show();
    this._serviceReservation.validateDoctor(this.formInput.doctor,this.formInput.date,this.formInput.appointment)
    .subscribe(
      res => {
        this.spinner.hide();
        if(res === 1){
          this.formInput.doctor = null;
          Swal.fire({
            title: 'Atención!!!!',
            text: 'El doctor ya tiene una reserva a la misma hora en otro consultorio',
            type: 'warning',
          });
        }else if(res === 2){
          this.formInput.doctor = 0;
          Swal.fire({
            title: 'Atención!!!!',
            text: 'El doctor ya tiene bloqueado ese horario',
            type: 'warning',
          });
        }
      },
      err => {
        this.spinner.hide();
        console.log("Errro Validación ");
      }
    );
  }

  /**SELECT DEL AUTO COMPLETADO */
  selectedItem(it: any){
    const { item } = it;
    this.formInput.patient = item.id;
  }

  /**AUTOCOMPLETADO DE LOS MEDICAMENTOS **/
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._servicePatient.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  /**
   * Used to format the result data from the lookup into the
   * display and list values. Maps `{name: "band", id:"id" }` into a string
  */
   resultFormatBandListValue(value: any) {
    return value.name;
  }
  /**
    * Initially binds the string value and then after selecting
    * an item by checking either for string or key/value object.
  */
  inputFormatBandListValue(value: any)   {
    if(value.name)
      return value.name
    return value;
  }

}
