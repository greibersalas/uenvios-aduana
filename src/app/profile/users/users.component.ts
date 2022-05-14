import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

// Language
import { LanguageApp } from 'src/app/config/data-table.language';

// Components
import { FormPasswordComponent } from './form-password/form-password.component';
import { UsersFormComponent } from './form/users-form.component';
// Models
import { UserModel } from '../../models/profile/users.model';
// Services
import { AuthService } from 'src/app/service/auth.service';
import { UsersService } from '../../service/profile/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dataList: UserModel[] = [];
  can_insert: boolean;
  can_update: boolean;
  can_delete: boolean;

  constructor(
    private _userServices: UsersService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _modalSerive: NgbModal,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initPermissions();
    this.getAllData();
  }

  initPermissions(){
    this.route.data.subscribe(res => {
      this.auth.hasPermissionsInsert(res.permissions).subscribe( resp => {
        this.can_insert = !resp;
      });
      this.auth.hasPermissionsDelete(res.permissions).subscribe( resp => {
        this.can_delete = !res;
      });
      this.auth.hasPermissionsUpdate(res.permissions).subscribe( resp => {
        this.can_update = !resp;
      });
    });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F2'){
      this.addForm(0);
    }
  }

  addForm(id: number){
    const modal = this._modalSerive.open(UsersFormComponent);
    modal.result.then((result : any) => {
      if (result === 'Save click'){
        this.getAllData();
      }
    });
    modal.componentInstance.id = id;
  }

  addFormPassword(id: number){
    const modal = this._modalSerive.open(FormPasswordComponent);
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getAllData();
      }
    });
    modal.componentInstance.id = id;
  }


  getAllData(): void{
    this.dataList = [];
    this.spinner.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this._userServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.spinner.hide();
      },
      err => {
        this.toastr.error('Atención, ocurrio un error al obtener los usuarios!!', 'Error!', {
          timeOut: 3000,
        });
        this.spinner.hide();
      }
    )
  }

  delete(user: UserModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: `¿Está seguro que desea eliminar al usuario ${user.username}?`,
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this._userServices.delete(user.id)
        .subscribe(
          res => {
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
            this.getAllData();
          },
          err => {
            Swal.fire('Error!', 'No se puedo borrar el registro', 'error');
          }
        );
      }
    });
  }

  onChangeState(user: UserModel){
    console.log({user});
    const state_str = user.estado === 1 ? 'Inactivar' : 'Activar';
    const state = user.estado === 1 ? 2 : 1;
    Swal.fire({
      title: 'Atención!!!!',
      text: `¿Está seguro que desea ${state_str} al usuario ${user.username}?`,
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this._userServices.changeState(user.id,state)
        .subscribe(
          res => {
            Swal.fire('ok!', 'Registro actualizado satisfactoriamente', 'success');
            this.getAllData();
          },
          err => {
            Swal.fire('Error!', `No se puedo ${state_str} al usuario`, 'error');
          }
        );
      }
    });
  }

}
