import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Deposit } from '../../models/deposit.model';
import { DepositService } from '../../services/public/deposit.service';

export interface FormDeposit {
  ruc: string;
  code: string;
  description: string;
  phone: string;
  email: string;
  address: string;
 
}

@Component({
  selector: 'app-modal-deposit',
  templateUrl: './modal-deposit.component.html',
  styles: []
})
export class ModalDepositComponent implements OnInit {

  @Input() id: number;
  formInput: FormDeposit;

  constructor(
    private depositService: DepositService,
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
      code:'',
      description: '',
      phone:'',
      email:'',
      address:''
    };
  }

  setFormData(): void{
    this.depositService.getOne(this.id).subscribe(res=>{
      this.formInput.ruc = res.ruc;
      this.formInput.code = res.code;
      this.formInput.description = res.description;
      this.formInput.phone = res.phone;
      this.formInput.email = res.email;
      this.formInput.address = res.address;
      
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const deposit: Deposit = new Deposit();
    if (this.id === 0){
      deposit.iddeposit = 0;
      deposit.ruc = this.formInput.ruc;
      deposit.code = this.formInput.code;
      deposit.description = this.formInput.description;
      deposit.phone = this.formInput.phone;
      deposit.email = this.formInput.email;
      deposit.address = this.formInput.address;
            
      this.depositService.insert(deposit).subscribe(
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
            'Ocurrio un error al registrar el deposito temporal',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      deposit.iddeposit = this.id;
      deposit.ruc = this.formInput.ruc;
      deposit.code = this.formInput.code;
      deposit.description = this.formInput.description;
      deposit.phone = this.formInput.phone;
      deposit.email = this.formInput.email;
      deposit.address = this.formInput.address;
      

      this.depositService.update(this.id,deposit).subscribe(
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
            'Ocurrio un error al actulizar el deposito temporal',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
