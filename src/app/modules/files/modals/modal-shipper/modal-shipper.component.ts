import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Shipper } from '../../models/shipper.model';
import { ShipperService } from '../../services/public/shipper.service';

export interface FormShipper {
  code: string;
  description: string;
  
}

@Component({
  selector: 'app-modal-shipper',
  templateUrl: './modal-shipper.component.html',
  styles: []
})
export class ModalShipperComponent implements OnInit {

  @Input() id: number;
  formInput: FormShipper;

  constructor(
    private shipperService: ShipperService,
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
    this.shipperService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
      
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const shipper: Shipper = new Shipper();
    if (this.id === 0){
      shipper.idshipper = 0;
      shipper.code = this.formInput.code;
      shipper.description = this.formInput.description;
            
      this.shipperService.insert(shipper).subscribe(
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
            'Ocurrio un error al registrar el embarcador',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      shipper.idshipper = this.id;
      shipper.code = this.formInput.code;
      shipper.description = this.formInput.description;
      

      this.shipperService.update(this.id,shipper).subscribe(
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
            'Ocurrio un error al actulizar el embarcador',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}