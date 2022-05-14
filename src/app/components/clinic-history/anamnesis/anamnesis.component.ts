import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AnamnesisModel } from 'src/app/models/main/clinicHistory.model';
import { AnamnesisService } from '../../../service/main/anamnesis.service';

@Component({
  selector: 'app-anamnesis',
  templateUrl: './anamnesis.component.html',
  styleUrls: ['./anamnesis.component.scss']
})
export class AnamnesisComponent implements OnInit {

  session: any = {};
  @Input() idclinichistory: number;
  formInputs: AnamnesisModel;
  constructor(private _anamnesisService: AnamnesisService,private store: Store<{session: any}>,
    private toastr: ToastrService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.clear();
    this.getSession();
    this.get();
  }

  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      if(sess.id){
        this.session = sess;
        console.log("session", sess);
        this.formInputs.user = sess.id;
      }
    });
  }

  clear(): void{
    this.formInputs = {
      id: 0,
      clinichistory: this.idclinichistory,
      emergency_contact_name: '',
      emergency_contact_cellphone: '',
      medicine: false,
      medicine_name: '',
      medic_name: '',
      medic_cellphone: '',
      hepatitis: false,
      hepatitis_type: '',
      diabetes: false,
      compensated: false,
      high_pressure: false,
      suffers_illness: '',
      visit_frequency: '',
      traumatic_experiences: '',
      extracted_molars: '',
      complication_anesthesia: '',
      gums_bleed: false,
      last_prophylaxis: null,
      popping: '',
      satisfied_aesthetic: '',
      last_date: null
    };
  }

  get(): void{
    this.spinner.show();
    this._anamnesisService.getByClinicHistory(this.idclinichistory)
    .subscribe(
      res => {
        this.spinner.hide();
        this.formInputs = res;
      },
      err => {
        this.spinner.hide();
        if(err.error.statusCode !== 404){
          this.toastr.error(
            'Ocurrio un error al obtener la anamnesis',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      }
    );
  }

  onSubmit(): void{
    this.spinner.show();
    if(this.formInputs.id > 0){
      //update anamnesis
      this._anamnesisService.update(this.formInputs,this.formInputs.id)
      .subscribe(
        res => {
          this.formInputs = res;
          this.spinner.hide();
          this.toastr.success(
            'Anamnesis editada correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al editar la anamnesis',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }else{
      //insert anamnesis
      this._anamnesisService.insert(this.formInputs)
      .subscribe(
        res => {
          this.formInputs = res;
          this.spinner.hide();
          this.toastr.success(
            'Anamnesis registrada correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al insertar la anamnesis',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }
  }

}
