import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { CalendarOptions, EventApi } from '@fullcalendar/angular'
import esLocale from '@fullcalendar/core/locales/es';
import { INITIAL_EVENTS, createEventId } from './event-util';
import { DoctorModel } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/service/doctor.service';
import { BusinessLineService } from 'src/app/service/business-line.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { BusinessLineModel } from 'src/app/models/business-line.model';
import { SpecialtyModel } from 'src/app/models/specialty.model';
import { Subscription } from 'rxjs';
import {NgbCalendar,} from '@ng-bootstrap/ng-bootstrap';
import { QuotationService  } from "../../service/main/quotation.service";
import { FormSearchResult } from "./form-search-result";
import { ReservaDetail } from './reserva-detail';
import { EnvironmentDoctorModel } from 'src/app/models/environment-doctor.model';
import { EnvironmentDoctorService } from 'src/app/service/environment-doctor.service';
import { ProgramationService } from '../../service/programation.service'
import { hours } from './interface.hours';
import { ProgramationModel } from 'src/app/models/programation.model';
import { QuotationDetailModel } from 'src/app/models/main/quotation-detail.model';
import { FormFilter } from "./form.filter";
import Swal from 'sweetalert2';
import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { TariffService } from 'src/app/service/tariff.service';
import { TariffModel } from 'src/app/models/tariff.model';
import { CampusModel } from 'src/app/models/campus.model';
import { DistrictsModel } from 'src/app/models/districts.model';
import { LanguageApp } from 'src/app/config/data-table.language';









export class ListHousr{
  value: string;
  name: hours;
}

export class FormProgramation{
  iddetail:number;
  patient_id: number;
  environment?:number;
  date?:Date;
  appointment?:string;
  tariff_id?:number;
  numberquotation:number;
  patient: string;
  reason:string;
}

export class FormProgramationByPatient{
  idpatient?:number;
  iddoctor?:number;
  id_tariff?:number;
  environment?:number;
  date?: string;
  appointment?:string;
  reason?:string;
}

export class FormReProgramming{
  environment?:number;
  date?: string;
  appointment?:string;
}

export class Formdetail{
  id?:number;
  environment:string;
  doctor:string;
  doctor_id:number
  appointment:string;
  patient:string;
  reason:string; 
}

export class FormOption{
  withquotation:boolean;
  woutquotation:boolean;
}

export class Resumen{
  register:number;
  confirm:number;
  attended:number
}

export class PatientList{
  id:number;
  name:string;
  lastname:string;
  dni:string;

}
 

@Component({
  selector: 'app-programation',
  templateUrl: './programation.component.html',
  styleUrls: ['./programation.component.scss']
})
export class ProgramationComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  //Subscription
  subsDoctor$: Subscription;
  subsBl$: Subscription;
  subsSpecialty$: Subscription;
  subsEnvironment$: Subscription;
  subsPatient$: Subscription;
  subsPatientFilter$: Subscription;
  subsTariff$: Subscription;
  

  listDoctors: DoctorModel[]=[];
  listDoctorsByPatient: DoctorModel[]=[];
  listBl: BusinessLineModel[]=[];
  listSpecialty: SpecialtyModel[]=[];
  listEvents:ProgramationModel[]=[];
  listPatient:ClinicHistoryModel[]=[]
  listPatientFilter:PatientList[]=[]
  listTariff:TariffModel[]=[]
  environmentList:EnvironmentDoctorModel[]=[];
  environmentListByPatient:EnvironmentDoctorModel[]=[];
  environmentFilterList:any[]=[];

  eventsCalendar:any[]=[]

  @ViewChild('modalForm') modal: UiModalComponent;
  @ViewChild('modaldetail') mdetail: UiModalComponent;
  
  resumeInfo: Resumen;
  formInput: FormFilter;
  dataSearch:FormSearchResult;
  formProgramation : FormProgramation;
  formshowdetail:Formdetail;
  formOptions:FormOption;
  formReprogramming: FormReProgramming;
  formByPatient: FormProgramationByPatient;
  loadingSelectDoctor: boolean = false;
  loadingSelectBl: boolean = false;
  loadingSelectBlRe: boolean = false;
  loadingSelectSp: boolean = false;
  loadingSelectEnv: boolean = false;
  loadingSelectAmbiente: boolean = false;
  loadingSelectEnvironment: boolean = false;
  loadingSelectEnvironmentRe: boolean = false;
  loadingSelectPatient : boolean = false;
  loadingSelectTariff : boolean = false;
  loadingSelectPatientFilter: boolean = false;
  loadingSelectEnvironmentByPatient : boolean = false;
  public isSubmitByPatient: boolean;
  haveResult = true;
  hiddenForm = true;
  hiddenSearch = true;
  hideDetail =  false;
  hideFormRe = true
  hideSpinReForm = true;
  hideSpinAdd = true;
  hideFormSelect = false;
  hiddenSearchPatient = true;
  typeModal = 'modal-ls';
  statusPrueba = "Pendiente"
  numberquotation:number
  datevalid:Boolean = true;
  public isSubmit: boolean;
  turnList:ListHousr[]=[];
  turnListByPatient:ListHousr[]=[];
  
  
  constructor(
    private _serviceDoctor:DoctorService,
    private _serviceBL:BusinessLineService,
    private _serviceSpecialty:SpecialtyService,
    public calendar: NgbCalendar,
    private _serviceQuotation: QuotationService,
    private _serviceReservation:ProgramationService,
    private _serviceEnvironment:EnvironmentDoctorService,
    private _servicePatient:ClinicHistoryService,
    private toastr:ToastrService,
    private _serviceTariff: TariffService

    ) 
    {  }
  ngOnDestroy(): void {
    this.subsDoctor$.unsubscribe();
    this.subsBl$.unsubscribe();
    this.subsSpecialty$.unsubscribe();
    this.subsEnvironment$.unsubscribe();
    this.subsPatient$.unsubscribe();
    this.subsTariff$.unsubscribe();
  }

  ngOnInit(): void {
    this.isSubmitByPatient = false;
    this.formInput = {
      doctor: {id:0,nameQuote:''},
      bl: {id:0,name:'Todas'},
      specialty: {id:0,name:'Todas'},
      environment:{id:0,name:'Todas', interval:0, campus:0,businessLine:0},
      register:true,
      confirm: true,
      attended:true,
      patient : {id:0,name:'Todos',lastname:'',dni:''}
    }
    this.dataSearch = {
      patient_id:0,
      numberquo: 0,
      doctor: '',
      patient: '',
      specialty:'',
      doctor_id:0,
      detail: []
    }
    this.formProgramation={
      patient_id:0,
      iddetail:0,
      tariff_id:0,
      patient:'',
      numberquotation:0,
      reason:''
    }
    this.formshowdetail={
      environment:'',
      doctor:'',
      doctor_id:0,
      appointment:'',
      patient:'',
      reason:''
    }
    this.formReprogramming={}
    this.formOptions={
      withquotation : true,
      woutquotation : false
    }
    this.formByPatient={}

    this.resumeInfo={
      register:0,
      confirm:0,
      attended:0
    }
    
    this.getDoctors();
    this.getBusinessLines();
    this.getSpecialty();
    this.getEnvironmentFilter()
    this.getReservation();
    this.getPatient();
    this.getPatientFilter();
    this.getTariffs();
    
  }

  onSelectPatient(e){
    console.log(e)
    this.formByPatient.idpatient = e
  }

  onSelectDoctor(e){
    this.formByPatient.iddoctor = e
  }

  onSelectTariff(e){
    
    this.formByPatient.id_tariff = e
  }

  onSelectDateForClient(){
    if(!this.formByPatient.iddoctor){
      this.toastr.warning(
        'Debe seleccionar un doctor',
        'Atención',{
          timeOut: 3000, progressBar: true
        }
      );
      this.formByPatient.date = '';
    }
    
    if (!this.validDate(String(this.formByPatient.date))){
      this.getEnvironmentByPatient(String(this.formByPatient.date))
    }
    else{
      this.environmentListByPatient = []
    }
  }

  onSelectEnvironmentByPatient(e:number){
    this.turnListByPatient = []
    this.loadingSelectBl = true
    let paramsDate = String(this.formByPatient.date).split('-')
    this._serviceReservation.gethoursAvailible(
      this.formByPatient.iddoctor ,
      e,
      Number(paramsDate[2]),
      Number(paramsDate[1]),
      Number(paramsDate[0]),
    ).subscribe((res:hours[])=>{
      res.forEach((re:hours)=>{
        this.turnListByPatient.push({
          value:String(re.beging)+"-"+String(re.end),
          name:re
        })
      })
      this.loadingSelectBl = false
    })
  }

  getEnvironmentByPatient(date:any){
    
    let dayweek = ["sun","mon","tue","wed","thu","fri","sat"]
    this.loadingSelectEnvironmentByPatient  = true;
    this.environmentListByPatient = [];
    let datesplit = date.split('-');
    let dt = new Date()
    dt.setFullYear(Number(datesplit[0]),Number(datesplit[1])-1,Number(datesplit[2]))
        
    this._serviceDoctor.get(this.formByPatient.iddoctor).subscribe((doctor:DoctorModel)=>{
      
      if (doctor[dayweek[dt.getDay()]]){
        this._serviceReservation.getEnvironmentAvailible(Number(datesplit[2]),Number(datesplit[1])-1,Number(datesplit[0]))
        .subscribe( 
          (res:EnvironmentDoctorModel[]) =>{
            this.environmentListByPatient = res
            this.loadingSelectEnvironmentByPatient  = false;
          }, 
          err => {
            this.loadingSelectEnvironmentByPatient  = false;
            console.log(err.error);
          }
        );

      }else{
        this.loadingSelectEnvironmentByPatient  = false;
        this.formByPatient.date = '';
        this.toastr.error('Atención, Doctor No se encuentra disponible en la fecha seleccionada', 'Error!', {
          timeOut: 5000, progressBar: true
        });
      }     

    })
    
  }

  addappointmentByPatient(){
    var programation:ProgramationModel={
      id:0,
      patient:this.formByPatient.idpatient,
      tariff:this.formByPatient.id_tariff,
      date:this.formByPatient.date,
      environment:this.formByPatient.environment,
      doctor:this.formByPatient.iddoctor,
      appointment: this.formByPatient.appointment,
      reason:this.formByPatient.reason
    }    
       
    this._serviceReservation.insert(programation).subscribe(
      (res:ProgramationModel)=>{
        this.cancelProgrammingPatient();
        this.getReservation();
        this.toastr.success(
          'La reserva fue registrada correctamente',
          'Ok!',
          {timeOut: 3000, progressBar: true}
        );
      },
      err => {
        this.toastr.error(
          'Ocurrio un error al registrar la cita',
          'Atención',
          {timeOut: 3000, progressBar: true}
        );
      }
    )
  }

  getTariffs(){
    this.loadingSelectTariff = true;
    this.listTariff = [];
    this.subsTariff$ = this._serviceTariff.getAll()
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

  getPatient(){
    this.loadingSelectPatient = true;
    this.listPatient = [];
    this.subsPatient$ = this._servicePatient.getAll()
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

  getPatientFilter(){
    this.loadingSelectPatientFilter= true;
    this.listPatientFilter= [];
    this.subsPatientFilter$ = this._servicePatient.getAll()
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
        this.formInput.patient = this.listPatientFilter[0];
      }, 
      err => {
        this.loadingSelectPatientFilter = false;
        console.log(err.error);
      }
    );
  }

  onSelectOption1(e){
    if (e =='option1'){
      this.formOptions.withquotation = true;
      this.formOptions.woutquotation = false;
    }
    if (e =='option2'){
      this.formOptions.withquotation = false;
      this.formOptions.woutquotation = true;
    }
    console.log(this.formOptions.withquotation,this.formOptions.woutquotation)
  }

  async clickSelectOption(){
    if (this.formOptions.withquotation){
      this.hideFormSelect = true
      this.hideSpinAdd = false
      await this.sleep(500)
      this.hideSpinAdd = true
      this.hiddenSearch = false
    }
    if (this.formOptions.woutquotation){
      this.hideFormSelect = true
      this.hideSpinAdd = false
      await this.sleep(500)
      this.hideSpinAdd = true
      this.hiddenSearchPatient = false
    }
  }

  async cancelProgrammingPatient(){
    this.hiddenSearchPatient = true
    this.hideSpinAdd = false
    await this.sleep(500)
    this.hideSpinAdd = true
    this.hideFormSelect = false

  }

  async setProgramation(){
    this.hideDetail = true
    this.hideSpinReForm = false
    await this.sleep(500)
    this.hideSpinReForm = true
    this.hideFormRe = false
  }

  async cancelReprogramming(){
    this.hideFormRe = true
    this.hideSpinReForm = false
    await this.sleep(500)
    this.hideSpinReForm = true
    this.hideDetail = false
    this.formReprogramming={}
  }

  onselectdateReprogramming(e){
    if (!this.validDate(e)){
      this.getEnvironmentReprogramming(e)
    }
    else{
      this.environmentList = []
    }
  }

  onSelectEnvirontmentReprogramming(e){
    console.log(this.formReprogramming)
    this.turnList = []
    this.loadingSelectBlRe = true
    let paramsDate = String(this.formReprogramming.date).split('-')
    this._serviceReservation.gethoursAvailible(
      this.formshowdetail.doctor_id,
      e,
      Number(paramsDate[2]),
      Number(paramsDate[1]),
      Number(paramsDate[0]),
    ).subscribe((res:hours[])=>{
      res.forEach((re:hours)=>{
        this.turnList.push({
          value:String(re.beging)+"-"+String(re.end),
          name:re
        })
      })
      this.loadingSelectBlRe = false
    })
  }

  getEnvironmentReprogramming(date){
    let dayweek = ["sun","mon","tue","wed","thu","fri","sat"]
    this.loadingSelectEnvironmentRe = true;
    this.environmentList = [];
    let datesplit = date.split('-');
    let dt = new Date()
    dt.setFullYear(Number(datesplit[0]),Number(datesplit[1])-1,Number(datesplit[2]))
    this._serviceDoctor.get(this.formshowdetail.doctor_id).subscribe((doctor:DoctorModel)=>{
      
      if (doctor[dayweek[dt.getDay()]]){
        this._serviceReservation.getEnvironmentAvailible(Number(datesplit[2]),Number(datesplit[1])-1,Number(datesplit[0]))
        .subscribe( 
          (res:EnvironmentDoctorModel[]) =>{
            this.environmentList = res
            this.loadingSelectEnvironmentRe = false;
          }, 
          err => {
            this.loadingSelectEnvironmentRe = false;
            console.log(err.error);
          }
        );

      }else{
        this.loadingSelectEnvironmentRe = false;
        this.toastr.error('Atención, Doctor No se encuentra disponible en la fecha seleccionada', 'Error!', {
          timeOut: 5000,
        });
        //Swal.fire('Error!', 'Doctor No se encuentra disponible en la fecha seleccionada', 'error');
      }
      

    })
  }

  async updateAppointment(){
    const data: ProgramationModel = {
      environment: this.formReprogramming.environment,
      date: this.formReprogramming.date,
      appointment: this.formReprogramming.appointment,
    }
    this._serviceReservation.update(data,this.formshowdetail.id).subscribe((res:ProgramationModel)=>{
       this.hideFormRe = true
       this.getReservation()
       this.sleep(500)
       this.mdetail.hide()
     })
   }

  onCheckboxChangeRegister(e){
    this.formInput.register = e.target.checked
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  onCheckboxChangeConfirm(e){
    this.formInput.confirm = e.target.checked
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  onCheckboxChangeAttended(e){
    this.formInput.attended  = e.target.checked
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  onchangeFilterPatient(e){
    this.formInput.patient = e
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  onchangeFilterEnviroment(e){
   this.formInput.environment = e
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  onchangeFilterDoctor(e){
    this.formInput.doctor = e
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  onchangeFilterBl(e){
    this.formInput.bl = e
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  onchangeFilterSpecialty(e){
    this.formInput.specialty = e
    this._serviceReservation.filterReservation(this.formInput).subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }



  getEnvironmentFilter(){
    this.loadingSelectEnvironment = true;
    this.environmentFilterList = [];
    this.subsEnvironment$= this._serviceEnvironment.getAll()
    .subscribe( 
      res =>{
        this.environmentFilterList.push({id:0,name:'Todos',interval:0,campus:0,businessLine:0});
        res.forEach((environment:EnvironmentDoctorModel) => {
          this.environmentFilterList.push(environment);
        });
        this.loadingSelectEnvironment = false;
        this.formInput.environment = this.environmentFilterList[0];
      }, 
      err => {
        this.loadingSelectEnvironment = false;
        console.log(err.error);
      }
    );
  }

  clearVar(){
    this.numberquotation = null
    this.dataSearch = {
      patient_id:0,
      numberquo: 0,
      doctor: '',
      patient: '',
      specialty:'',
      doctor_id:0,
      detail: []
    }
    this.formProgramation={
      patient_id:0,
      iddetail:0,
      tariff_id:0,
      patient:'',
      numberquotation:0,
      reason:''
    }
  }

  getReservation(){
    this._serviceReservation.getAll().subscribe((res:ProgramationModel[])=>{
      this.listEvents = res
      this.addEvents(this.listEvents)
      this.setResumen(res)
    })
  }

  setResumen(event:ProgramationModel[]){
    this.resumeInfo={
      register:0,
      confirm:0,
      attended:0
    }
    event.forEach(element => {
      switch (element.state) {
        case 1:
          this.resumeInfo.register = this.resumeInfo.register + 1
          break;
        case 2:
          this.resumeInfo.confirm = this.resumeInfo.confirm + 1
          break;
        case 3:
          this.resumeInfo.attended = this.resumeInfo.attended + 1
          break;
        default:
          break;
      }
    });
  }

  addEvents(events:ProgramationModel[]){
    let ev:any[]=[]
    
    events.forEach((res:any)=>{
      let color=''
      if (res.state == 2)
        color ='#00bcd4'
      else if (res.state == 3)
        color ='#2ed8b6'  
      else
        color ='#FFB64D'  
      ev.push({
        id:res.id,
        title:res.environment.name+" - "+ res.doctor.nameQuote,
        start:res.date+"T"+res.appointment.split('-')[0],
        end:res.date+"T"+res.appointment.split('-')[1],
        descrition:res.environment.name,
        color:color
      })
    })
    
    this.calendarOptions.events = ev;
  }

  
  addappointment(){
   var programation:ProgramationModel={
     id:0,
     patient:this.dataSearch.patient_id,
     qdetail:this.formProgramation.iddetail,
     tariff:this.formProgramation.tariff_id,
     date: String(this.formProgramation.date),
     environment:this.formProgramation.environment,
     doctor:this.dataSearch.doctor_id,
     appointment: this.formProgramation.appointment,
     reason:this.formProgramation.reason
   }

   
      
   this._serviceReservation.insert(programation).subscribe((res:ProgramationModel)=>{
      this._serviceQuotation.reserveDetail(this.formProgramation.iddetail).subscribe(()=>{
        this.search()
        this.getReservation()
        this.showResult()
      })
    })
  }

  search(){
    this._serviceQuotation.getOne(this.numberquotation).subscribe((res)=>{
      this.dataSearch.date = moment(res.createdAt).format('DD-MM-YYYY');
      this.dataSearch.numberquo = res.id
      this.dataSearch.doctor = res.doctor.name
      this.dataSearch.doctor_id = res.doctor.id
      this.dataSearch.patient = res.clinicHistory.name +" "+res.clinicHistory.lastNameFather+" "+res.clinicHistory.lastNameMother
      this.dataSearch.patient_id = res.clinicHistory.id
      this.dataSearch.specialty = res.specialty.name;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        language: LanguageApp.spanish_datatables,
        search: true,
        responsive: true,
        order: [0],
        orderClasses: true
      };
      this._serviceQuotation.getDetail(this.numberquotation).subscribe((resdet:QuotationDetailModel[])=>{
        this.dataSearch.detail = [];
        var i = 0
        resdet.forEach(det=>{
           i++
           var detail:ReservaDetail={
              idDetail : det.id,
              index : i,
              treatment : det.tariff.name,
              treatment_id: det.tariff.id,
              cant : det.quantity,
              value : det.total,
              status: det.state
           }   
           this.dataSearch.detail.push(detail);
        })
        this.showResult()  
      })      
    })
  }

  sleep(ms){
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  setView(_hiddenResult:boolean,_hiddenForm:boolean,_hiddenSearch:boolean,_hideFormSelect:boolean,_hiddenSearchPatient:boolean,sizeModal='modal-xl'):void{
    this.haveResult = _hiddenResult;
    this.hiddenForm = _hiddenForm;
    this.hiddenSearch = _hiddenSearch;
    this.hideFormSelect = _hideFormSelect;
    this.hiddenSearchPatient= _hiddenSearchPatient;
    this.typeModal = sizeModal;
  }

  showResult(){
    this.formProgramation={
      patient_id:0,
      iddetail:0,
      patient:'',
      numberquotation:0,
      reason:''
    }
    this.setView(false,true,true,true,true)
  }

  showForm(iditem:ReservaDetail){
    this.formProgramation.iddetail = iditem.idDetail
    this.formProgramation.tariff_id = iditem.treatment_id
    this.formProgramation.numberquotation = this.numberquotation
    this.formProgramation.patient = this.dataSearch.patient
    this.setView(true,false,true,true,true,'modal-ls')
  }

  resetForm(){
    this.setView(true,true,true,false,true,'modal-ls');
  }

  getEnvironment(date:any){
    let dayweek = ["sun","mon","tue","wed","thu","fri","sat"]
    this.loadingSelectEnvironment = true;
    this.environmentList = [];
    let datesplit = date.split('-');
    let dt = new Date()
    dt.setFullYear(Number(datesplit[0]),Number(datesplit[1])-1,Number(datesplit[2]))
        
    this._serviceDoctor.get(this.dataSearch.doctor_id).subscribe((doctor:DoctorModel)=>{
      
      if (doctor[dayweek[dt.getDay()]]){
        this._serviceReservation.getEnvironmentAvailible(Number(datesplit[2]),Number(datesplit[1])-1,Number(datesplit[0]))
        .subscribe( 
          (res:EnvironmentDoctorModel[]) =>{
            this.environmentList = [];
            this.environmentList = res;
            this.loadingSelectEnvironment = false;
          }, 
          err => {
            this.loadingSelectEnvironment = false;
            console.log(err.error);
          }
        );

      }else{
        this.loadingSelectEnvironment = false;
        this.toastr.error('Atención, Doctor No se encuentra disponible en la fecha seleccionada', 'Error!', {
          timeOut: 5000,
        });
        //Swal.fire('Error!', 'Doctor No se encuentra disponible en la fecha seleccionada', 'error');
      }
      

    })
    
  }

  getEnvironmentByClient(date:any){
    let dayweek = ["sun","mon","tue","wed","thu","fri","sat"]
    this.loadingSelectEnvironment = true;
    this.environmentList = [];
    let datesplit = date.split('-');
    let dt = new Date()
    dt.setFullYear(Number(datesplit[0]),Number(datesplit[1])-1,Number(datesplit[2]))
        
    this._serviceDoctor.get(this.dataSearch.doctor_id).subscribe((doctor:DoctorModel)=>{
      
      if (doctor[dayweek[dt.getDay()]]){
        this.environmentList = [];
        this._serviceReservation.getEnvironmentAvailible(Number(datesplit[2]),Number(datesplit[1])-1,Number(datesplit[0]))
        .subscribe( 
          (res:EnvironmentDoctorModel[]) =>{
            this.environmentList = res
            this.loadingSelectEnvironment = false;
          }, 
          err => {
            this.loadingSelectEnvironment = false;
            console.log(err.error);
          }
        );

      }else{
        this.loadingSelectEnvironment = false;
        this.toastr.error('Atención, Doctor No se encuentra disponible en la fecha seleccionada', 'Error!', {
          timeOut: 5000,
        });
        //Swal.fire('Error!', 'Doctor No se encuentra disponible en la fecha seleccionada', 'error');
      }
      

    })
    
  }

  isEnableDoctor(id:number){
    
  }

  onSelectEnvironment(e:number){
    this.turnList = []
    this.loadingSelectBl = true
    let paramsDate = String(this.formProgramation.date).split('-')
    this._serviceReservation.gethoursAvailible(
      this.dataSearch.doctor_id,
      e,
      Number(paramsDate[2]),
      Number(paramsDate[1]),
      Number(paramsDate[0]),
    ).subscribe((res:hours[])=>{
      res.forEach((re:hours)=>{
        this.turnList.push({
          value:String(re.beging)+"-"+String(re.end),
          name:re
        })
      })
      this.loadingSelectBl = false
    })
  }

  onSelectDate(e){
    if (!this.validDate(e)){
        this.getEnvironment(e)
    }
    else{
      this.environmentList = []
    }
  }

  validDate(date: string){
    var x=new Date();
    var fecha = date.split("-");
   
    x.setFullYear(Number(fecha[0]),Number(fecha[1])-1,Number(fecha[2]));
    
    var today = new Date();
    
    if (x >= today)
      return false;
    else
      return true;
  }

  
  getDoctors(){
    this.loadingSelectDoctor = true;
    this.listDoctors = [];
    this.subsDoctor$ = this._serviceDoctor.getAll()
    .subscribe( 
      res =>{
        this.listDoctorsByPatient = res;
        this.listDoctors.push({id:0,nameQuote:'Todos'});
        res.forEach((doctor:DoctorModel) => {
          this.listDoctors.push(doctor);
        });
        this.loadingSelectDoctor = false;
        this.formInput.doctor = this.listDoctors[0];
      }, 
      err => {
        this.loadingSelectDoctor = false;
        console.log(err.error);
      }
    );
  }

  getSpecialty(){
    
    this.loadingSelectSp = true;
    this.listSpecialty = [];
    this.subsSpecialty$ = this._serviceSpecialty.getByBusinessLine(this.formInput.bl.id)
    .subscribe( 
      res =>{
        this.listSpecialty.push({id:0,name:'Todas'});
        res.forEach((specialty:SpecialtyModel) => {
          this.listSpecialty.push(specialty);
        });
        this.loadingSelectSp = false;
        this.formInput.specialty = this.listSpecialty[0];
      }, 
      err => {
        this.loadingSelectSp = false;
        console.log(err.error);
      }
    );
  }

  getBusinessLines(){
    this.loadingSelectBl = true;
    this.listBl = [];
    this.subsBl$ = this._serviceBL.getAll()
    .subscribe( 
      res =>{
        this.listBl.push({id:0,name:'Todas'});
        res.forEach((bl:BusinessLineModel) => {
          this.listBl.push(bl);
        });
        this.loadingSelectBl = false;
        this.formInput.bl = this.listBl[0];
      }, 
      err => {
        this.loadingSelectBl = false;
        console.log(err.error);
      }
    );
  }

  
  currentEvents: EventApi[] = [];

  calendarOptions: CalendarOptions = {
    timeZone: 'UTC',
    dayMaxEvents: true,
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'timeGridWeek,timeGridDay custom1',
      center: 'title',
      right: 'prevYear,prev,next,nextYear'
    },
    locale:esLocale,
    initialView: 'timeGridWeek',
    slotMinTime:'08:00:00',
    slotMaxTime:'19:00:00',
    allDaySlot:false,
    slotLabelFormat:{
        hour: 'numeric',
        minute: '2-digit',
        meridiem: false
    },
    height:'630px',
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [ 1, 2, 3, 4, 5, 6], 
     
      startTime: '8:00', // a start time (10am in this example)
      endTime: '19:00', // an end time (6pm in this example)
    },
    
    customButtons: {
      custom1: {
        text: 'Programar cita',
        click: () =>{
          this.clearVar()
          this.setView(true,true,true,false,true,'modal-ls');
          this.modal.show()
         
          
        }
      },
      
    },
    //dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: (info)=>{
      this.hideDetail = false
      this.hideSpinReForm = true
      this.hideFormRe = true
      this.formReprogramming={}
      this._serviceReservation.getOne(Number(info.event.id)).subscribe((res:any)=>{
        
          //this._serviceQuotation.getOne(res.qdetail.quotation.id).subscribe(resq=>{
            this.formshowdetail.id = res.id
            this.formshowdetail.environment = res.environment.name
            this.formshowdetail.doctor = res.doctor.nameQuote
            this.formshowdetail.doctor_id =  res.doctor.id
            this.formshowdetail.appointment= res.appointment
            this.formshowdetail.patient = res.patient.name+" "+res.patient.lastNameFather
            this.formshowdetail.reason = res.reason

            
          //})
      })
      
      this.mdetail.show()
     /*  alert('Event: ' + info.event.title);
      alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
      alert('View: ' + info.view.type);*/
  
      // change the border color just for fun
      //info.el.style.borderColor = 'red';
    },
       
  };

  

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }

  

  

  

}
