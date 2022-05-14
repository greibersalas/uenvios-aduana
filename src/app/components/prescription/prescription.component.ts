import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageApp } from 'src/app/config/data-table.language';

import { PrescriptionModel } from 'src/app/models/main/prescription.model';
import { MedialAttentionService } from 'src/app/service/main/medial-attention.service';
import { PrescriptionService } from '../../service/main/prescription.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  @Input() idclinichisotry: number;
  dtOptions: DataTables.Settings = {};

  formInput: PrescriptionModel;
  loaderInsert: boolean = false;
  prescriptions: PrescriptionModel[] = [];

  constructor(public _prescriptionService: PrescriptionService,
    private spinner: NgxSpinnerService,private toastr: ToastrService,
    private _maService: MedialAttentionService) { }

  ngOnInit(): void {
    this.resetInputs();
    this.getList();
  }

  resetInputs(): void{
    this.formInput = {
      id: 0,
      name: '',
      amount: 1,
      presentation: '',
      indications: '',
      observations: '',
      clinichistory: this.idclinichisotry,
      medicalact: this._maService.idmedicalact
    }
  }

  onSubmit() {
    this.spinner.show();
    if(this.formInput.id > 0){//update
      this._prescriptionService.update(this.formInput,this.formInput.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Receta editada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.resetInputs();
          this.getList();
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al editar la receta!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }else{//insert
      this._prescriptionService.insert(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Receta agregada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.resetInputs();
          this.getList();
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al registrar la receta!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }
  }

  getList(): void{
    this.prescriptions = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this._prescriptionService.getByMedicalAct(this._maService.idmedicalact)
    .subscribe(
      res => {
        res.forEach((item: PrescriptionModel) => {
          this.prescriptions.push(item);
        });
      },
      error => {}
    );
  }

  setFormInput(data: PrescriptionModel): void{
    this.formInput = data;
  }

}
