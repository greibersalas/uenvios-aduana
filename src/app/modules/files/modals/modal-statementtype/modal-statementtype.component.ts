import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { StatementType } from '../../models/statementtype.model';
import { StatementTypeService } from '../../services/public/statementtype.service';

export interface FormStatementType {
  code: string;
  description: string;
}

@Component({
  selector: 'app-modal-statementtype',
  templateUrl: './modal-statementtype.component.html',
  styles: []
})
export class ModalStatementTypeComponent implements OnInit {

  @Input() id: number;
  formInput: FormStatementType;

  constructor(
    private statementtypeService: StatementTypeService,
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
    this.statementtypeService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const statementtype: StatementType = new StatementType();
    if (this.id === 0){
      statementtype.idtypedeclaration = 0;
      statementtype.code = this.formInput.code;
      statementtype.description= this.formInput.description;
          
      this.statementtypeService.insert(statementtype).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'StatementType registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el StatementType',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      statementtype.idtypedeclaration = this.id;
      statementtype.code = this.formInput.code;
      statementtype.description= this.formInput.description;

      this.statementtypeService.update(this.id,statementtype).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'La declaración se actualizo correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al actulizar la declaración',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}

