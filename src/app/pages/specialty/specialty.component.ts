import { Component, OnInit, ViewChild } from '@angular/core';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import { LanguageApp } from 'src/app/config/data-table.language';
import { SpecialtyService } from '../../service/specialty.service';
import { BusinessLineModel } from 'src/app/models/business-line.model';
import { BusinessLineService } from 'src/app/service/business-line.service';
import { SpecialtyModel } from 'src/app/models/specialty.model';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: SpecialtyModel[] = [];
  blList: BusinessLineModel[] = [];
  formInput: SpecialtyModel;
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _specialtyServices: SpecialtyService,
    private _blService: BusinessLineService,
    private toastr: ToastrService,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.initPermissions();
    this.getAllData();
    this.getBusinessLine();
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

  clear(){
    this.formInput = {
      id: 0,
      name: '',
      description: '',
      businessLines: '',
      laboratory: false,
      odontograma: false,
      format: 'OI'
    };
  }

  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      this.processing = true;
      if(this.formInput.id === 0){
        //insert new specialty
        this._specialtyServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Especilidad insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar la especialidad.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._specialtyServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Especialidad editada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar la especialidad.', 'Error!', {
              timeOut: 3000,
            });
          }
        )
      }
    }
  }

  getAllData(){
    this.loading = true;
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
    this._specialtyServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar la especialidad ',err.error)
      }
    )
  }

  getBusinessLine(){
    this.blList = [];
    this._blService.getAll()
    .subscribe(
      res =>{
        res.forEach((it:BusinessLineModel) => {
          this.blList.push(it);
        });
      },
      err => {
        console.log(err.error);
      }
    );
  }

  setItem(item:SpecialtyModel){
    //console.log(item);
    this.formInput = {
      id: item.id,
      name: item.name,
      description: item.description,
      businessLines: item.businessLines.id,
      laboratory: item.laboratory,
      odontograma: item.odontograma,
      format: item.format
    }
  }

  delete(specialty: SpecialtyModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la especialidad '+specialty.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._specialtyServices.delete(specialty.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar la sede', 'error');
            }
          );
        }
    });
  }

}
