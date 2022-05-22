import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Ubigeo } from '../../models/ubigeo.model';
import { UbigeoService } from '../../services/public/ubigeo.service';

export interface FormUbigeo {
  iddepartamento: string;
  departamento: string;
  idprovincia: string;
  provincia: string;
  iddistrito: string;
  distrito: string;
}

@Component({
  selector: 'app-modal-ubigeo',
  templateUrl: './modal-ubigeo.component.html',
  styles: []
})
export class ModalUbigeoComponent implements OnInit {

  @Input() id: number;
  formInput: FormUbigeo;

  constructor(
    private ubigeoService: UbigeoService,
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.clear();
  }

  clear(): void{
    this.formInput = {
      iddepartamento: '',
      departamento: '',
      idprovincia: '',
      provincia: '',
      iddistrito: '',
      distrito: ''
    };
  }

  setFormData(): void{
    //
  }

  onSubmit(): void{
    this.spinner.show();
    const ubigeo: Ubigeo = new Ubigeo();
    if (this.id === 0){
      ubigeo.IdUbigeo = 0;
      ubigeo.IdDepartamento = this.formInput.iddepartamento;
      ubigeo.IdProvincia = this.formInput.idprovincia;
      ubigeo.IdDistrito = this.formInput.iddistrito;
      if (this.formInput.idprovincia === '' && this.formInput.iddistrito === ''){
        ubigeo.IdProvincia = '00';
        ubigeo.IdDistrito = '00';
        ubigeo.Description = this.formInput.departamento;
      } else if (this.formInput.iddistrito === ''){
        ubigeo.IdDistrito = '00';
        ubigeo.Description = this.formInput.provincia;
      } else {
        ubigeo.Description = this.formInput.distrito;
      }
      this.ubigeoService.insert(ubigeo).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'Ubigeo registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el Ubigeo',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
