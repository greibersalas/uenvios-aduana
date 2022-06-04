import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Sender } from '../../models/sender.model';
import { SenderService } from '../../services/public/sender.service';

export interface FormSender {
  code: string;
  description: string;
  
}

@Component({
  selector: 'app-modal-sender',
  templateUrl: './modal-sender.component.html',
  styles: []
})
export class ModalSenderComponent implements OnInit {

  @Input() id: number;
  formInput: FormSender;

  constructor(
    private senderService: SenderService,
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
    this.senderService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
      
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const sender: Sender = new Sender();
    if (this.id === 0){
      sender.idsender = 0;
      sender.code = this.formInput.code;
      sender.description = this.formInput.description;
            
      this.senderService.insert(sender).subscribe(
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
      sender.idsender = this.id;
      sender.code = this.formInput.code;
      sender.description = this.formInput.description;
      

      this.senderService.update(this.id,sender).subscribe(
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
