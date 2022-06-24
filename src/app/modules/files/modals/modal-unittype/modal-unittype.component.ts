import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Unittype } from '../../models/unittype.model';
import { UnittypeService } from '../../services/public/unittype.service';

export interface FormUnittype {
  code: string;
  description: string;
  
}

@Component({
  selector: 'app-modal-unittype',
  templateUrl: './modal-unittype.component.html',
  styles: []
})
export class ModalUnittypeComponent implements OnInit {

  @Input() id: number;
  formInput: FormUnittype;

  constructor(
    private unittypeService: UnittypeService,
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
    this.unittypeService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
      
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const unittype: Unittype = new Unittype();
    if (this.id === 0){
      unittype.id = 0;
      unittype.code = this.formInput.code;
      unittype.description = this.formInput.description;
            
      this.unittypeService.insert(unittype).subscribe(
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
            'Ocurrio un error al registrar el Remitente',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      unittype.id = this.id;
      unittype.code = this.formInput.code;
      unittype.description = this.formInput.description;
      

      this.unittypeService.update(this.id,unittype).subscribe(
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
            'Ocurrio un error al actulizar el Remitente',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
