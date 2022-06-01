import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/public/country.service';

export interface FormCountry {
  code: string;
  nombre: string;
  idzona: string;
}

@Component({
  selector: 'app-modal-country',
  templateUrl: './modal-country.component.html',
  styles: []
})
export class ModalCountryComponent implements OnInit {

  @Input() id: number;
  formInput: FormCountry;

  constructor(
    private countryService: CountryService,
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
    this.setFormData();
  }

  

  clear(): void{
    this.formInput = {
      code: '',
      nombre: '',
      idzona: '',
    };
  }

  setFormData(): void{
    this.countryService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.nombre = res.nombre;
      this.formInput.idzona = '';
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const country: Country = new Country();
    if (this.id === 0){
      country.id = 0;
      country.code = this.formInput.code;
      country.nombre = this.formInput.nombre;
      country.idzona = Number(this.formInput.idzona);
      
      this.countryService.insert(country).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'Country registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el Country',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      country.id = this.id;
      country.code = this.formInput.code;
      country.nombre = this.formInput.nombre;
      country.idzona = Number(this.formInput.idzona);

      this.countryService.update(this.id,country).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'El pais se actualizo correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al actulizar el Pais',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
