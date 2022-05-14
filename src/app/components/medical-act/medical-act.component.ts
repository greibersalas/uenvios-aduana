import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { MedicalActModel } from '../../models/main/medical-act.model';
import { MedialAttentionService } from '../../service/main/medial-attention.service';

@Component({
  selector: 'app-medical-act',
  templateUrl: './medical-act.component.html',
  styleUrls: ['./medical-act.component.scss']
})
export class MedicalActComponent implements OnInit {
  @Input() idreservation: number;
  @Output() guardo = new EventEmitter<boolean>();
  loaderInsert = false;

  formInput: MedicalActModel;

  constructor(
    // tslint:disable-next-line: variable-name
    private _maService: MedialAttentionService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.resetInputs();
    this.getMedialAct();
  }

  resetInputs(): void{
    this.formInput = {
      id: 0,
      examine_income: '',
      reason: '',
      bone_scan: false,
      periodontogram: false,
      clinical_photography: false,
      laboratory_exams: false,
      study_models: false,
      radiographic_report: '',
      reservation: this.idreservation
    };
  }

  getMedialAct(): void{
    this._maService.getMedialActByReservation(this.idreservation)
    .subscribe(
      res => {
        this.formInput = res;
        // console.log("this.formInput", this.formInput);
        this.guardo.emit(true);
        this._maService.idmedicalact = this.formInput.id;
      },
      error => {
        console.error(error.error);
      }
    );
  }

  onSubmit(): void{
    this.spinner.show();
    if (this.formInput.id > 0){
      this._maService.update(this.formInput, this.formInput.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.guardo.emit(true);
          this.toastr.success('Actomedico actualizado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.formInput = res;
          this._maService.idmedicalact = this.formInput.id;
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al actualizar el acto medico!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }else{
      this._maService.insert(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.guardo.emit(true);
          this.toastr.success('Actomedico registrado correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.formInput = res;
          this._maService.idmedicalact = this.formInput.id;
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al insertar el acto medico!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }
  }

}
