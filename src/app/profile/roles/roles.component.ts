import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { RolesModel } from '../../models/profile/roles.model';
import { RolesService } from '../../service/profile/roles.service';
import { LanguageApp } from 'src/app/config/data-table.language';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: RolesModel[] = [];
  formInput: RolesModel;
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;
  listDashboard: string[] = ['ASISTENTE','BASICO','ODONTOLOGO','RECEPCIÓN','SUPERUSER'];
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _rolesServices: RolesService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getAllData();
    this.initPermissions();
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
      idrole: 0,
      name: '',
      description: '',
      dashboard: ''
    };
  }

  save(form: any) {    
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      console.log(this.formInput);
      this.processing = true;
      if(this.formInput.idrole === 0){
        //insert new campus
        this._rolesServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Rol insertado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            //console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar el rol.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.idrole > 0){
        this._rolesServices.update(this.formInput,this.formInput.idrole)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Rol editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            //console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar el rol.', 'Error!', {
              timeOut: 3000,
            });
          }
        )
      }
      
    }
  }

  getAllData(){
    this.spinner.show();
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
    this._rolesServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.spinner.hide();
        this.loading = false;
      },
      err => {
        this.spinner.hide();
        this.loading = false;
        //console.error('Error al buscar los roles ',err.error);
        this.toastr.error('Atención, ocurrio un error al obtener los roles!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  setItem(item: RolesModel){
    this.formInput = item;
    /* this.formInput = {
      idrole: item.idrole,
      name: item.name,
      description: item.description,
      dashboard: item.dashboard
    } */
  }

  delete(rol: RolesModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar El rol '+rol.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.value) {
          this._rolesServices.delete(rol.idrole)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el rol', 'error');
            }
          );          
        }
    });
  }
}
