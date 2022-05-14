import { Component, OnInit, ViewChild } from '@angular/core';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { PermissionsModel } from 'src/app/models/profile/permissions.model';
import { PermissionsService } from 'src/app/service/permissions.service';
import { MasterPermissionsModel } from "../../models/profile/master-permissions.model";
import { MasterPermissionsService } from "../../service/master-permissions.service";
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  @ViewChild('modalForm') modal: UiModalComponent;

  public loading: boolean = true;
  usuario: number;
  listPermissions:PermissionsModel[]=[];
  listMasterPermissions:MasterPermissionsModel[]=[];
  formInput:PermissionsModel;
  public isSubmit: boolean;
  public processing: boolean = false;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

 

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private servivcePermissions: PermissionsService,
    private mservicePermissions:MasterPermissionsService,
    private auth:AuthService,
    
  ) { 
    this.route.queryParams.subscribe(param=>{
      this.usuario = param["user"]
    })
  }

  ngOnInit(): void {
    this.initPermissions();
    this.getMasterPermissions();
    this.getPermissions();
    this.clear()
    
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
      view:false,
      delete:false,
      update:false,
      insert:false,
      user: this.usuario,
      mpermissions:0
    };
  }

  getPermissions(){
    this.servivcePermissions.getPermissionsByUser(this.usuario).subscribe((permissions:PermissionsModel[])=>{
      this.listPermissions = permissions
      this.loading = false
    })
  }

  getMasterPermissions(){
    this.mservicePermissions.getAll().subscribe(res=>{
      this.listMasterPermissions = res;
    })
  }

  setItem(item:any){
    this.formInput = {
      id: item.id,
      view: item.view,
      insert: item.insert,
      update: item.update,
      delete: item.delete,
      user: this.usuario,
      mpermissions:item.mpermissions.id
    }
  }

  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      console.log(this.formInput);
      this.processing = true;
      if(this.formInput.id === 0){
        this.servivcePermissions.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Permiso insertado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getPermissions();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar el permiso.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this.servivcePermissions.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getPermissions();
            this.modal.hide();
            this.toastr.success('Permiso editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar el permiso.', 'Error!', {
              timeOut: 3000,
            });
          }
        )
      }
    }
  }

  delete(permissions: any){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el permiso '+permissions.mpermissions.page+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this.servivcePermissions.delete(permissions.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getPermissions();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el permiso', 'error');
            }
          );
        }
    });
  }

}
