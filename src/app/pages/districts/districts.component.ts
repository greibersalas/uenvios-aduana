import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';

import { DistrictsModel } from 'src/app/models/districts.model';
import { ProvinceModel } from '../../models/province.model';
import { DistrictsService } from '../../service/districts.service';
import { ProvinceService } from '../../service/province.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: DistrictsModel[] = [];
  formInput: DistrictsModel;
  provincesList: ProvinceModel[] = [];
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _districtsServices: DistrictsService,
    private toastr: ToastrService,private spinner: NgxSpinnerService,
    private _countryServices: ProvinceService,
    private auth:AuthService,
    private route: ActivatedRoute
    )
    { }

  ngOnInit(): void {
    this.initPermissions();
    this.getAllData();
    this.getCountrys();
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

  getCountrys(){
    this.provincesList = [];
    this._countryServices.getAll()
    .subscribe(
      res =>{
        this.provincesList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

  clear(){
    this.formInput = {
      id: 0,
      provinces: '',
      name: '',
      ubigeo: '',
      users: Number(sessionStorage.getItem('iduser'))
    };
  }

  onSubmit() {
    this.spinner.show();
    if(this.formInput.id === 0){
      this._districtsServices.insert(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.modal.hide();
          this.toastr.success('Distrito insertado correctamente!!', 'Ok!', {
            timeOut: 3000, progressBar: true, closeButton: true
          });
          this.clear();
          this.getAllData();
        },
        err =>{
          this.spinner.hide();
          this.toastr.success('Atención, ha ocurrido un error al insertar el distrito', 'Error!', {
            timeOut: 4000, progressBar: true, closeButton: true
          });
        }
      );
    }else if(this.formInput.id > 0){
      this._districtsServices.update(this.formInput,this.formInput.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.clear();
          this.getAllData();
          this.modal.hide();
          this.toastr.success('Distrito editado correctamente!!', 'Ok!', {
            timeOut: 3000,progressBar: true, closeButton: true
          });
        },
        err => {
          this.spinner.hide();
          this.toastr.success('Atención, ha ocurrido un error al editar el distrito', 'Error!', {
            timeOut: 3000,progressBar: true, closeButton: true
          });
        }
      )
    }
  }

  getAllData(){
    this.spinner.show();
    this.dataList = [];
    this._districtsServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.success('Atención, ocurrio un error al obtener los distritos!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  setItem(item:any){
    this.formInput = {
      id: item.id,
      provinces: item.provinces.id,
      name: item.name,
      ubigeo: item.ubigeo,
      users: Number(sessionStorage.getItem('iduser'))
    }
  }

  delete(districts: DistrictsModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el distrito '+districts.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._districtsServices.delete(districts.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el distrito', 'error');
            }
          );
        }
    });
  }

}
