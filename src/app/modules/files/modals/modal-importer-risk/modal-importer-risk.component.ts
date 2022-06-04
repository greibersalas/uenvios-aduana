import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { ImporterRisk } from '../../models/importer-risk.model';
import { ImporterRiskService } from '../../services/public/importer-risk.service';

export interface FormImporterRisk {
  code: string;
  description: string;
  
}

@Component({
  selector: 'app-modal-importer-risk',
  templateUrl: './modal-importer-risk.component.html',
  styles: []
})
export class ModalImporterRiskComponent implements OnInit {

  @Input() id: number;
  formInput: FormImporterRisk;

  constructor(
    private importerriskService: ImporterRiskService,
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
    this.importerriskService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
      
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const importerrisk: ImporterRisk = new ImporterRisk();
    if (this.id === 0){
      importerrisk.id = 0;
      importerrisk.code = this.formInput.code;
      importerrisk.description = this.formInput.description;
            
      this.importerriskService.insert(importerrisk).subscribe(
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
            'Ocurrio un error al registrar el riesgo del importador',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      importerrisk.id = this.id;
      importerrisk.code = this.formInput.code;
      importerrisk.description = this.formInput.description;
      

      this.importerriskService.update(this.id,importerrisk).subscribe(
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
            'Ocurrio un error al actulizar el riesgo del importador',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}