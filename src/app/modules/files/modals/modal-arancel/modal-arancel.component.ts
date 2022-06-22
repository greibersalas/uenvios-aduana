import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Arancel } from '../../models/arancel.model';
import { ArancelService } from '../../services/public/arancel.service';

export interface FormArancel {
  code: string;
  description: string;
  adv: number;
  isc: number;
  igv: number;
  imp: number;
  de: number;
  da: number;
  insurance: number;
  tax_surcharge: number;
  measure_unit: string;
  penalty_surtax: number;
  
}

@Component({
  selector: 'app-modal-arancel',
  templateUrl: './modal-arancel.component.html',
  styles: []
})
export class ModalArancelComponent implements OnInit {

  @Input() id: number;
  formInput: FormArancel;

  constructor(
    private arancelService: ArancelService,
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
      adv: 0,
      isc : 0,
      igv : 0,
      imp: 0,
      de: 0,
      da: 0,
      insurance: 0,
      tax_surcharge: 0,
      measure_unit: '',
      penalty_surtax:0


    };
  }

  setFormData(): void{
    this.arancelService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
      this.formInput.adv = res.adv;
      this.formInput.isc = res.isc;
      this.formInput.igv = res.igv;
      this.formInput.imp = res.imp;
      this.formInput.de = res.de;
      this.formInput.da = res.da;
      this.formInput.insurance = res.insurance;
      this.formInput.tax_surcharge = res.tax_surcharge;
      this.formInput.measure_unit = res.measure_unit;
      this.formInput.penalty_surtax = res.penalty_surtax;

    })
  }

  onSubmit(): void{
    this.spinner.show();
    const arancel: Arancel = new Arancel();
    if (this.id === 0){
      arancel.id = 0;
      arancel.code = this.formInput.code;
      arancel.description = this.formInput.description;
      arancel.adv = this.formInput.adv;
      arancel.isc = this.formInput.isc;
      arancel.igv = this.formInput.igv;
      arancel.imp = this.formInput.imp;
      arancel.de = this.formInput.de;
      arancel.da = this.formInput.da;
      arancel.insurance = this.formInput.insurance;
      arancel.tax_surcharge = this.formInput.tax_surcharge;
      arancel.measure_unit = this.formInput.measure_unit;
      arancel.penalty_surtax = this.formInput.penalty_surtax; 
            
      this.arancelService.insert(arancel).subscribe(
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
            'Ocurrio un error al registrar el Arancel',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      arancel.id = this.id;
      arancel.code = this.formInput.code;
      arancel.description = this.formInput.description;
      arancel.adv = this.formInput.adv;
      arancel.isc = this.formInput.isc;
      arancel.igv = this.formInput.igv;
      arancel.imp = this.formInput.imp;
      arancel.de = this.formInput.de;
      arancel.da = this.formInput.da;
      arancel.insurance = this.formInput.insurance;
      arancel.tax_surcharge = this.formInput.tax_surcharge;
      arancel.measure_unit = this.formInput.measure_unit;
      arancel.penalty_surtax = this.formInput.penalty_surtax; 

      this.arancelService.update(this.id,arancel).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'El arancel se actualizo correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al actulizar el Arancel',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}