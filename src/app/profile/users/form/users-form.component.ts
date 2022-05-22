import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

import { UserModel } from 'src/app/models/profile/users.model';
import { RolesService } from 'src/app/service/profile/roles.service';
import { RolesModel } from 'src/app/models/profile/roles.model';
import { UsersService } from 'src/app/service/profile/users.service';
import { CampusModel } from 'src/app/models/campus.model';
import { DoctorModel } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @Input() id: number;
  formInput: UserModel;
  rolesList: RolesModel[] = [];
  listCampus: CampusModel[] = [];
  listDoctor: DoctorModel[] = [];
  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private roleService: RolesService,
    private userServices: UsersService
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    this.getRoles();
    this.clear();
    if (this.id > 0){
      this.get();
    }
  }

  clear(): void{
    this.formInput = {
      id: 0,
      username: '',
      email: '',
      // password: '',
      // roles: ''
    };
  }

  get(): void{
    this.spinner.show();
    this.userServices.getOne(this.id)
    .subscribe(
      res => {
        this.formInput = res;
        // this.formInput.roles = String(res.roles.idrole);
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al obtener los datos del usuario',
          'Atención',
          {
            timeOut: 3000,
            progressBar: true
          }
        );
      }
    );
  }

  getRoles(): void{
    this.rolesList = [];
    this.roleService.getAll()
    .subscribe(
      res => {
        res.forEach((role: RolesModel) => {
          this.rolesList.push(role);
        });
      },
      err => {
        console.log(err.error);
      }
    );
  }

  onSubmit(): void{
    this.spinner.show();
    if (this.formInput.id === 0){
      // insert new campus
      this.userServices.insert(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.clear();
          this.toastr.success('Usuario insertado correctamente!!', 'Ok!', {
            timeOut: 3000, progressBar: true
          });
          this.activeModal.close('Save click');
        },
        err => {
          console.log({err});
          const { error } = err;
          this.spinner.hide();
          this.toastr.error(`Atención, ha ocurrido un error al insertar el usuario, ${error.message}`, 'Error!', {
            timeOut: 4000, progressBar: true,
            closeButton: true
          });
        }
      );
    }else if (this.formInput.id > 0){
      this.userServices.update(this.formInput, this.formInput.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.clear();
          this.toastr.success('Usuario editado correctamente!!', 'Ok!', {
            timeOut: 3000, progressBar: true
          });
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Atención, ha ocurrido un error al editar el usuario.', 'Error!', {
            timeOut: 3000, progressBar: true
          });
        }
      );
    }
  }

}
