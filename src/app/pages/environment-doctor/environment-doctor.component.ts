import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import * as moment from 'moment-timezone';

import { UiModalComponent } from '../../theme/shared/components/modal/ui-modal/ui-modal.component';
import { LanguageApp } from 'src/app/config/data-table.language';

import { BusinessLineModel } from '../../models/business-line.model';
import { CampusModel } from "../../models/campus.model"
import { EnvironmentDoctorModel } from '../../models/environment-doctor.model'
import { CampusService } from "../../service/campus.service";
import { EnvironmentDoctorService } from '../../service/environment-doctor.service'
import { BusinessLineService } from "../../service/business-line.service";
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-environment-doctor',
  templateUrl: './environment-doctor.component.html',
  styleUrls: ['./environment-doctor.component.scss']
})
export class EnvironmentDoctorComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild('modalForm') modal: UiModalComponent;
  dataList: EnvironmentDoctorModel[] = [];
  formInput: EnvironmentDoctorModel;
  campusList: CampusModel[]=[];
  businessLineList : BusinessLineModel[]=[];
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _environmentDoctorServices: EnvironmentDoctorService,
    private _campusServices: CampusService,
    private _businessLine: BusinessLineService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initPermissions();
    this.getCampus();
    this.getBusinessLine();
    this.getAllData();
    this.clear();
  }

  initPermissions(){
    this.route.data.subscribe(res=>{
      this.auth.hasPermissionsInsert(res.permissions).subscribe(res=>{
        this.can_insert = !res;
      });
      this.auth.hasPermissionsDelete(res.permissions).subscribe(res=>{
        this.can_delete = !res
      });
      this.auth.hasPermissionsUpdate(res.permissions).subscribe(res=>{
        this.can_update = !res
      });

    })
  }

  getCampus(){
    this.campusList = [];
    this._campusServices.getAll()
    .subscribe(
      res =>{
        this.campusList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  getBusinessLine(){
    this.businessLineList = [];
    this._businessLine.getAll()
    .subscribe(
      res =>{
        this.businessLineList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  clear(){
    this.formInput = {
      id: 0,
      name: '',
      description: '',
      interval: 0,
      campus: '',
      businessline: '',
      time_cleaning: 0,
      schedule_morning_since: null,
      schedule_morning_until: null,
      lunch_since: null,
      lunch_until: null,
      schedule_afternoon_since: null,
      schedule_afternoon_until: null
    };
  }

  onSubmit():void {
    this.spinner.show();
    if(this.formInput.id === 0){
      this._environmentDoctorServices.insert(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.modal.hide();
          this.toastr.success('Ambiente registrado correctamente!!', 'Ok!', {
            timeOut: 3000, progressBar: true
          });
          this.clear();
          this.getAllData();
        },
        err =>{
          this.spinner.hide();
          console.log(err.error);
          this.toastr.success('Atención, ha ocurrido un error al registrar el ambiente.', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }else if(this.formInput.id > 0){
      this._environmentDoctorServices.update(this.formInput,this.formInput.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.clear();
          this.getAllData();
          this.modal.hide();
          this.toastr.success('Ambiente editado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
        },
        err => {
          this.spinner.hide();
          console.log(err.error);
          this.toastr.error('Atención, ha ocurrido un error al editar el ambiente.', 'Error!', {
            timeOut: 3000,
          });
        }
      )
    }
  }

  getAllData(){
    this.spinner.show();
    this.dataList = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this._environmentDoctorServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ha ocurrido un error al obtener los consultorios',
          'Atención',
          {timeOut: 4000, progressBar: true}
        );
      }
    )
  }

  setItem(item:EnvironmentDoctorModel): void{
    this._environmentDoctorServices.get(item.id).subscribe(
      res => {
        this.formInput = res;
        this.formInput.campus = res.campus.id;
      },
      err => {}
    );
  }

  delete(environmentDoctor: EnvironmentDoctorModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el ambiente '+environmentDoctor.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this._environmentDoctorServices.delete(environmentDoctor.id)
        .subscribe(
          res => {
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
            this.getAllData();
          },
          err => {
            Swal.fire('Error!', 'No se puedo borrar el ambiente', 'error');
          }
        );
      }
    });
  }

  validateLunchSince(): void{
   /*  if(this.formInput.schedule_morning_until > 0){
      if(this.formInput.schedule_morning_until > this.formInput.lunch_since){
        Swal.fire('Atención','La hora inicial de refrigerio no debe ser menor a la hora final del horaior de la mañana','error');
      }
    } */
  }

}
