import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Customs } from '../../models/customs.model';
import { CustomsService } from '../../services/public/customs.service';

export interface FormCustoms {
  code: string;
  description: string;
  
}

@Component({
  selector: 'app-modal-customs',
  templateUrl: './modal-customs.component.html',
  styles: []
})
export class ModalCustomsComponent implements OnInit {

  @Input() id: number;
  formInput: FormCustoms;

  constructor(
    private customsService: CustomsService,
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
    this.customsService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
      
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const customs: Customs = new Customs();
    if (this.id === 0){
      customs.idcustoms = 0;
      customs.code = this.formInput.code;
      customs.description = this.formInput.description;
            
      this.customsService.insert(customs).subscribe(
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
            'Ocurrio un error al registrar la aduana',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      customs.idcustoms = this.id;
      customs.code = this.formInput.code;
      customs.description = this.formInput.description;
      

      this.customsService.update(this.id,customs).subscribe(
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
            'Ocurrio un error al actulizar la aduana',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
