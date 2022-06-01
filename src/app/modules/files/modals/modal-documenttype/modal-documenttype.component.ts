import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { DocumentType } from '../../models/documenttype.model';
import { DocumenttypeService } from '../../services/public/documenttype.service';

export interface FormDocumenttype {
  code: string;
  name: string;
  code_sunat : string;
  description : string;
}

@Component({
  selector: 'app-modal-documenttype',
  templateUrl: './modal-documenttype.component.html',
  styles: []
})
export class ModalDocumenttypeComponent implements OnInit {

  @Input() id: number;
  formInput: FormDocumenttype;

  constructor(
    private documenttypeService: DocumenttypeService,
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
      name: '',
      code_sunat : '',
      description :'',
    };
  }

  setFormData(): void{
    this.documenttypeService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.name = res.name;
      this.formInput.code_sunat= res.code_sunat;
      this.formInput.description = res.description
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const documenttype: DocumentType = new DocumentType();
    if (this.id === 0){
      documenttype.idtypedocument = 0;
      documenttype.code = this.formInput.code;
      documenttype.name = this.formInput.name;
      documenttype.code_sunat = this.formInput.code_sunat;
      documenttype.description = this.formInput.description;
      
      this.documenttypeService.insert(documenttype).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'Documenttype registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el Documenttype',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      documenttype.idtypedocument = this.id;
      documenttype.code = this.formInput.code;
      documenttype.name = this.formInput.name;
      documenttype.code_sunat = this.formInput.code_sunat;
      documenttype.description = this.formInput.description;

      this.documenttypeService.update(this.id,documenttype).subscribe(
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
            'Ocurrio un error al actulizar el tipo de docuemnto',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
