import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateParserFormatter, NgbDatepickerI18n, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment-timezone';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { CustomDatepickerI18nService, I18n } from '../../../service/helpers/custom-datepicker-i18n.service';
import { EnvironmentDoctorService } from 'src/app/service/environment-doctor.service';
import { EnvironmentDoctorModel } from 'src/app/models/environment-doctor.model';
import { MedicalAppointmentComponent } from '../../../components/medical-appointment/medical-appointment.component';
import { AppointmentDetailComponent } from 'src/app/components/appointment-detail/appointment-detail.component';
import { DoctorModel } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/service/doctor.service';
import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DiaryLockComponent } from 'src/app/components/diary-lock/diary-lock.component';
import { DiaryListComponent } from 'src/app/components/diary-list/diary-list.component';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  providers: [I18n,{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class DiaryComponent implements OnInit {

  public model: any;
  public date: {year: number, month: number};
  listDentalOffice: EnvironmentDoctorModel[] = [];
  listPatientFilter: any[]=[]
  officeschedule : any[]=[]
  listDoctors:DoctorModel[]=[]
  listState:any[]=[]
  filter_doctor: any;
  filter_patient: any;
  filter_state: any;
  scheduleCalendar: any[] = [];
  hoursCalendar: any[] = [];
  schedule: any[] = [];
  widthDetail: number = 0;
  dateSelect: string = '';
  validateDate: boolean = false;
  session: any = {};
  loadingSelectDoctor:boolean;
  loadingSelectPatientFilter:boolean;
  loadingSelectStateFilter:boolean;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  //Autocomplet
  searching = false;
  searchFailed = false;
  patient: string = '';

  constructor(public parserFormatter: NgbDateParserFormatter,private calendar: NgbCalendar,
    private _edService: EnvironmentDoctorService, private spinner: NgxSpinnerService,
    private toastr: ToastrService,private _modalSerive: NgbModal,
    private _serviceDoctor: DoctorService,
    private _servicePatient:ClinicHistoryService,
    private store: Store<{session: any}>,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initPermissions();
    this.filter_doctor = 0;
    this.filter_patient = 0;
    this.filter_state = 0;
    this.getSession();
    this.getDentalOffice();
    this.getDoctors();
    this.getPatientFilter();
    this.getStatesFilter();
  }

  initPermissions(){
    this.route.data.subscribe(res=>{
      this.auth.hasPermissionsInsert(res.permissions).subscribe(res=>{
        this.can_insert = res;
      });
      this.auth.hasPermissionsDelete(res.permissions).subscribe(res=>{
        this.can_delete = res
      });
      this.auth.hasPermissionsUpdate(res.permissions).subscribe(res=>{
        this.can_update = res
      });

    })
  }

  getStatesFilter(){
    this.loadingSelectStateFilter=true;
    this.listState=[
      {
        id:0,
        state:"Todos"
      },
      {
        id:1,
        state:"Por confirmar"
      },
      {
        id:2,
        state:"Confirmado"
      },
      {
        id:3,
        state:"Atendido"
      },
    ]
    this.filter_state = this.listState[0].id;
    this.loadingSelectStateFilter=false;
  }

  onchangeFilterState(e:any){
    if(e === null){
      this.filter_state = 0;
    }else{
      this.filter_state = e;
    }
    this.setSchedule();
  }

  getPatientFilter(){
    this.loadingSelectPatientFilter= true;
    this.listPatientFilter= [];
    this._servicePatient.getAll()
    .subscribe(
      res =>{
        this.listPatientFilter.push({id:0,name:'Todos',lastname:'',dni:''});
        res.forEach((patient:ClinicHistoryModel) => {
          this.listPatientFilter.push({
            id:patient.id,
            name:patient.name,
            lastname:patient.lastNameFather,
            dni:patient.documentNumber
          });
        });
        this.loadingSelectPatientFilter = false;
        this.filter_patient = this.listPatientFilter[0].id;
      }, 
      err => {
        this.loadingSelectPatientFilter = false;
        console.log(err.error);
      }
    );
  }

  getDoctors(){
    this.loadingSelectDoctor = true;
    this.listDoctors = [];
    this._serviceDoctor.getAll()
    .subscribe(
      res =>{
        this.listDoctors.push({id:0,nameQuote:'Todos'});
        res.forEach((doctor:DoctorModel) => {
          this.listDoctors.push(doctor);
        });
        this.loadingSelectDoctor = false;
        this.filter_doctor = this.listDoctors[0].id;
      }, 
      err => {
        this.loadingSelectDoctor = false;
        console.log(err.error);
      }
    );
  }

  onchangeFilterDoctor(e: any){
    if(e === null){
      this.filter_doctor = 0;
    }else{
      this.filter_doctor = e;
    }
    this.setSchedule();
  }

  onchangeFilterPatient(e: any){
    if(e === null){
      this.filter_patient = 0;
    }else{
      this.filter_patient = e;
    }
    this.setSchedule();
  }

  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      console.log("Session ",sess.doctor);
      if(sess.id){
        this.session = sess;
        if(sess.doctor){
          this.filter_doctor = sess.doctor.id;
        }
        this.selectToday();
      }
    });
  }

  getDentalOffice(): void{
    this.spinner.show();
    this.listDentalOffice = [];
    this._edService.getByCampus().subscribe(
      res => {
        this.spinner.hide();
        this.listDentalOffice = res;
        let screenLegth = (screen.width*75/100);
        this.widthDetail = (screenLegth-(screenLegth*21/100)) / res.length;//795.8

      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al obtener los consultorios',
          'Atención',
          {timeOut: 3000, progressBar: true}
        );
      }
    );
  }

  selectToday(): void{
    this.model = this.calendar.getToday();
    this.getDentalOffice();
    this.setSchedule();
  }

  setSchedule(): void{
    this.validateDate = false;
    this.schedule = [];
    this.scheduleCalendar = [];
    this.spinner.show();
    const month = this.model.month < 10 ? `0${this.model.month}` : this.model.month;
    const day = this.model.day < 10 ? `0${this.model.day}` : this.model.day;
    this.dateSelect = `${this.model.year}-${month}-${day}`;
    //validamos que la fecha de instalación no sea un domingo
    /*if(moment(this.dateSelect).tz('America/Lima').day() === 0){
      this.toastr.warning('Los domingos no hay programación','Atención',{
        timeOut: 4000,
        progressBar: true
      });
      return;
    }*/
    let today = moment().tz('America/Lima').format('YYYY-MM-DD');
    if(moment(this.dateSelect).tz('America/Lima') < moment(today).tz('America/Lima')){
      this.validateDate = true;
    }
    //const date = `${this.model.year}-${this.model.month}-${this.model.day}`;
    //OJO falta la sede
    //this.filter_patient.id = this.filter_patient.id ? this.filter_patient.id : 0;
    var hoursoclock = [800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2100]
    this._edService.getProgrammingDay(
      this.dateSelect,this.session.idcampus,
      this.filter_doctor,
      this.filter_patient,
      this.filter_state
      ).subscribe(
      res => {
        this.schedule = res;
        this.hoursCalendar = []
        this.schedule.forEach(ca => {
          var hours = []
          ca.hours.forEach(element => {
            var since = Number(String(element.since).replace(':',''))
            var until = Number(String(element.until).replace(':',''))
            if (hoursoclock.includes(until)){
              until -= 50
            }else{
              until -= 10
            }
            if (element.type == 3)
              until = since + 10
           
            hours.push(
              {
                'data':element.data,
                'sinceMod':since,
                'untilMod':until,
                'type': element.type,
                'since': element.since,
                'until': element.until
              }
            )
          });
          this.hoursCalendar.push({
            'dentalOffice':ca.dentalOffice,
            'idenvironment': ca.idenvironment,
            'hours':hours
          })

        });
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al obtener la programación',
          'Atención',
          {timeOut: 4000, progressBar: true}
        );
      }
    );

    for (let i = 8; i < 22; i++) {
      let hours: string[]=[];
      let hoursBeta: any[]=[];

      for (let j = 0; j < 6; j++) {
        hours.push(
          `${i}:${j}0`
        );
        hoursBeta.push({
          'houra':`${i}:${j}0`,
          'hourb':`${i}${j}0`
        })
      }
      this.scheduleCalendar.push({
        hour: `${i}:00`,
        hoursBeta,
        hours
      });
    }
  }

  addMedicalAppointment(id: number,data: any): void{
    if (!this.can_insert){
      this.toastr.error(
        'No tiene permiso para agregar citas',
        'Atención',
        {timeOut: 5000, progressBar: true}
      );
      return;
    }
    const modal = this._modalSerive.open(MedicalAppointmentComponent,{size: 'lg'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getDentalOffice();
        this.setSchedule();
      }
    });
    data.id = id;
    data.date = this.dateSelect;
    modal.componentInstance.data = data;
  }

  setAppointmentDetail(id: number): void{
    const modal = this._modalSerive.open(AppointmentDetailComponent,{size: 'lg'});//
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getDentalOffice();
        this.setSchedule();
      }
    });
    modal.componentInstance.id = id;
  }

  onDiaryLock(): void{
    const modal = this._modalSerive.open(DiaryLockComponent,{size: 'lg'});
    modal.result.then((res: any) => {
      if(res === 'Save click'){
        //
      }
    });
  }

  onSearch(): void{
    const modal = this._modalSerive.open(DiaryListComponent,{size: 'xl'});
    modal.result.then((res: any) => {
      if(res === 'Save click'){
        //
      }
    });
    modal.componentInstance.patient = this.filter_patient;
    modal.componentInstance.doctor = this.filter_doctor;
    modal.componentInstance.state = this.filter_state;
    modal.componentInstance.date = this.dateSelect;
  }

  /**SELECT DEL AUTO COMPLETADO */
  selectedItem(it: any){
    const { item } = it;
    this.filter_patient = item.id;
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
