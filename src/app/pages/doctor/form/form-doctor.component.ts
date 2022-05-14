import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
// Load the full build.
import * as _ from 'lodash';

import { BusinessLineModel } from 'src/app/models/business-line.model';
import { DistrictsModel } from 'src/app/models/districts.model';
import { DoctorModel } from 'src/app/models/doctor.model';
import { SpecialtyModel } from 'src/app/models/specialty.model';
import { BusinessLineService } from 'src/app/service/business-line.service';
import { DistrictsService } from 'src/app/service/districts.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { EnvironmentDoctorService } from 'src/app/service/environment-doctor.service';
import { EnvironmentDoctorModel } from 'src/app/models/environment-doctor.model';

@Component({
  selector: 'app-form-doctor',
  templateUrl: './form-doctor.component.html',
  styleUrls: ['./form-doctor.component.scss']
})
export class FormDoctorComponent implements OnInit {

  @Input() id: number;

  formInput: DoctorModel;
  blList: BusinessLineModel[] = [];
  specialtyList: SpecialtyModel[] = [];
  districtList: DistrictsModel[] = [];
  environmentDoctorList: EnvironmentDoctorModel[] = [];

  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal,
    private toastr: ToastrService,private _blService: BusinessLineService,
    private _specialtyService: SpecialtyService,private _doctorServices: DoctorService,
    private _districtsService: DistrictsService,private spinner: NgxSpinnerService,
    private _environDoctService: EnvironmentDoctorService) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    this.clear();
    if(this.id > 0){
      this.get();
    }else{
      this.getBusinessLine();
      this.getDistrict();
      this.onGetEnvironmentDoctor();
    }
  }

  get(){
    this._doctorServices.get(this.id)
    .subscribe(
      res => {
        this.formInput = res;
        this.formInput.district = res.district.id;
        this.getBusinessLine();
        this.getDistrict();
        this.getSpecialty();
        this.onGetEnvironmentDoctor();
      },
      error => {}
    )
  }

  clear(): void{
    this.formInput = {
      id: 0,
      name: '',
      nameQuote: '',
      address: '',
      district: '',
      dni: '',
      cop: '',
      specialty: '',
      birthdate: '',
      email: '',
      phone: '',
      exclusive: false,
      cessationDate: null,
      environment: '',
      turn: '',
      business_lines: '',
      documentInssued: 0,
      dateDocumentInssued: null,
      number_hours: 0,
      porcentage: 0,
      user: 2,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      morning_schedule: '',
      afternoon_schedule: '',
      payment: 0,
      type_payment: ''
    };
  }

  onSubmit() {
    this.spinner.show();
    if(this.formInput.id === 0){
      //insert new country
      this._doctorServices.insert(this.formInput)
      .subscribe(
        res => {
          this.toastr.success('Doctor insertado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.clear();
          this.activeModal.close('Save click');
          this.spinner.hide();
        },
        err =>{
          this.spinner.hide();
          this.toastr.error('Atención, ha ocurrido un error al insertar el Doctor.', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }else if(this.formInput.id > 0){
      this._doctorServices.update(this.formInput,this.formInput.id)
      .subscribe(
        res => {
          this.clear();
          this.spinner.hide();
          this.activeModal.close('Save click');
          this.toastr.success('Doctor editado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Atención, ha ocurrido un error al editar el doctor.', 'Error!', {
            timeOut: 3000,
          });
        }
      )
    }

  }

  getBusinessLine(): void{
    this.blList = [];
    this._blService.getAll()
    .subscribe(
      res =>{
        this.blList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  getSpecialty(): void{
    if(this.formInput.business_lines.length > 0){
      this.specialtyList = [];
      this.spinner.show();
      const data = {ids: this.formInput.business_lines};
      this._specialtyService.getByBusinessLineArr(data)
      .subscribe(
        res =>{
          this.specialtyList = res;
          this.spinner.hide();
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al obtener las lineas de negocio','Atención',
            {timeOut: 4000, progressBar: true}
          );
          console.log(err.error);
        }
      );
    }
  }

  getDistrict(): void{
    this.districtList = [];
    this.districtList.push({id: 0, name: 'Seleccione'});
    this._districtsService.getAll()
    .subscribe(
      res =>{
        this.districtList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  onGetEnvironmentDoctor(): void{
    this.environmentDoctorList = [];
    this._environDoctService.getAll()
    .subscribe(
      res => {
        this.environmentDoctorList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

}
