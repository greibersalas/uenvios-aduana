import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Carrier } from '../../models/carrier.model';
import { CarrierService } from '../../services/public/carrier.service';

export interface FormCarrier {
  ruc: string;
  description: string;
  phone: string;
  email: string;
  address: string;
 
}

@Component({
  selector: 'app-modal-carrier',
  templateUrl: './modal-carrier.component.html',
  styles: []
})
export class ModalCarrierComponent implements OnInit {

  @Input() id: number;
  formInput: FormCarrier;

  constructor(
    private carrierService: CarrierService,
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
      ruc: '',
      description: '',
      phone:'',
      email:'',
      address:''
    };
  }

  setFormData(): void{
    this.carrierService.getOne(this.id).subscribe(res=>{
      this.formInput.ruc = res.ruc;
      this.formInput.description = res.description;
      this.formInput.phone = res.phone;
      this.formInput.email = res.email;
      this.formInput.address = res.address;
      
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const carrier: Carrier = new Carrier();
    if (this.id === 0){
      carrier.idcarrier = 0;
      carrier.ruc = this.formInput.ruc;
      carrier.description = this.formInput.description;
      carrier.phone = this.formInput.phone;
      carrier.email = this.formInput.email;
      carrier.address = this.formInput.address;
            
      this.carrierService.insert(carrier).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'Remitente registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el Transportista',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      carrier.idcarrier = this.id;
      carrier.ruc = this.formInput.ruc;
      carrier.description = this.formInput.description;
      carrier.phone = this.formInput.phone;
      carrier.email = this.formInput.email;
      carrier.address = this.formInput.address;
      

      this.carrierService.update(this.id,carrier).subscribe(
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
            'Ocurrio un error al actulizar el transportista',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
