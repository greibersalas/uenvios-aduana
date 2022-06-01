import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { ShippingType } from '../../models/shipping-type.model';
import { ShippingTypeService } from '../../services/public/shipping-type.service';

export interface FormShippingType {
  code: string;
  description: string;
 
}

@Component({
  selector: 'app-modal-shipping-type',
  templateUrl: './modal-shipping-type.component.html',
  styles: []
})
export class ModalShippingTypeComponent implements OnInit {

  @Input() id: number;
  formInput: FormShippingType;

  constructor(
    private shippingtypeService: ShippingTypeService,
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
      description: '',
    };
  }

  setFormData(): void{
    this.shippingtypeService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
     
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const shippingtype: ShippingType = new ShippingType();
    if (this.id === 0){
      shippingtype.idshippingtype = 0;
      shippingtype.code = this.formInput.code;
      shippingtype.description= this.formInput.description;
     
      
      this.shippingtypeService.insert(shippingtype).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'ShippingType registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el tipo de envío',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      shippingtype.idshippingtype = this.id;
      shippingtype.code = this.formInput.code;
      shippingtype.description = this.formInput.description;
     

      this.shippingtypeService.update(this.id,shippingtype).subscribe(
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

