import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { UserModel } from 'src/app/models/profile/users.model';
import { UsersService } from 'src/app/service/profile/users.service';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss']
})
export class FormPasswordComponent implements OnInit {

  @Input() id: number;
  formInput: UserModel;
  rePassword = '';

  fieldTextType: boolean;
  fieldTextType2: boolean;
  validateClaves = false;
  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _userServices: UsersService
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    this.formInput = {
      id: 0,
      username: '',
      email: '',
      // password: '',
      // roles: '',
    };
    this.get();
  }

  get(){
    this.spinner.show();
    this._userServices.getOne(this.id)
    .subscribe(
      res => {
        this.formInput = res;
        // this.formInput.password = '';
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

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  comprarClaves(){
    // this.formInput.password = this.formInput.password.replace(/ /g, '');
    this.rePassword = this.rePassword.replace(/ /g, '');
    /* if (this.formInput.password !== this.rePassword){
      this.validateClaves = true;
    }else{
      this.validateClaves = false;
    } */
  }

  onSubmit() {
    if(this.validateClaves){
      this.toastr.warning('Las claves no son iguales','Atención',
      {timeOut: 4000, progressBar: true, closeButton: true});
      return;
    }
    this.spinner.show();
    this._userServices.changePassword(this.formInput,this.formInput.id)
    .subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success('La clave ha sido cambiada correctamente!!', 'Ok!', {
          timeOut: 3000, progressBar: true
        });
        this.activeModal.close('Save click');
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Atención, ha ocurrido un error al cambiar la clave.', 'Error!', {
          timeOut: 3000, progressBar: true
        });
      }
    )
  }

}
