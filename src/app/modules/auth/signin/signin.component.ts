import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/service/auth.service';


export class FormInput {
  user: string;
  password: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  // Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  formInput: FormInput;
  btnValidar = false;
  fieldTextType: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private store: Store<{session: any}>
  ) {
    // Verifico si el usuario ya tiene la session activa
    this.verifarSession();
  }

  ngOnInit(): void{
    this.formInput = {
      user: '',
      password: '',
    };
  }

  verifarSession(): void{
    if (this.authService.loggedIn()){
      this.router.navigateByUrl('/');
    }
  }

  toggleFieldTextType(): void{
    this.fieldTextType = !this.fieldTextType;
  }

  onLogin(): void{
    this.btnValidar = true;
    this.authService.login(this.formInput)
    .subscribe(
      res => {
        if (res.state === 1){
          sessionStorage.setItem('iduser', String(res.id));
          sessionStorage.setItem('dashboard', res.roles.dashboard);
          this.toastr.success('Bienvenido ' + res.username, 'Sessión Iniciada', {
            timeOut: 3000,
          });
          this.router.navigateByUrl('/inicio');
        }else{
          this.toastr.warning('Usuario inactivo, contactar al alministrador del sistema', 'Atención', {
            timeOut: 4000,
            progressBar: true,
            closeButton: true
          });
        }
        this.btnValidar = false;
      },
      err => {
        this.btnValidar = false;
        console.log(err);
        this.toastr.error('Usuario y/o clave incorrectos!!', 'Error', {
          timeOut: 3000,
        });
      }
    );
  }
}
