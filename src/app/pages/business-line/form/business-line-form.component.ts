import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BusinessLineModel } from 'src/app/models/business-line.model';
import { BusinessLineService } from 'src/app/service/business-line.service';

export class FormInput {
  name: string;
  description: string;
}

@Component({
  selector: 'app-business-line-form',
  templateUrl: './business-line-form.component.html',
  styleUrls: ['./business-line-form.component.scss']
})
export class BusinessLineFormComponent implements OnInit {

  @Input() data: BusinessLineModel;

  formInput: BusinessLineModel;
  form: any;
  public isSubmit: boolean;
  public processing: boolean = false;

  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal,private toastr: ToastrService,
    private _blServices: BusinessLineService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.clear();
    this.formInput = this.data;
  }

  clear(){
    this.formInput = {
      id: 0,
      name: '',
      description: ''
    };
  }

  save(form: any) {    
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      console.log(this.formInput);
      this.processing = true;
      if(this.formInput.id === 0){
        //insert new business line
        this._blServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.toastr.success('Linea de Negocio insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.activeModal.close('Save click');
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar la Linea de Negocio.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._blServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.toastr.success('Linea de Negocio editada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.activeModal.close('Save click');
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar la Linea de Negocio.', 'Error!', {
              timeOut: 3000,
            });
          }
        )
      }
    }
  }

}
