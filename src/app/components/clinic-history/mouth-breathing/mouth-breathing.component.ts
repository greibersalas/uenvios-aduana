import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment-timezone';

import { MouthModel } from '../../../models/main/mouth-breathing.model';
import { MouthBreathingService } from '../../../service/main/mouth-breathing.service';

@Component({
  selector: 'app-mouth-breathing',
  templateUrl: './mouth-breathing.component.html',
  styleUrls: ['./mouth-breathing.component.scss']
})
export class MouthBreathingComponent implements OnInit {

  @Input() idclinichistory: number;
  inputs: MouthModel;

  constructor(private spinner: NgxSpinnerService,private toastr: ToastrService,
    private _mbService: MouthBreathingService) { }

  ngOnInit(): void {
    this.onReset();
    this.onGet();
  }

  onReset(): void{
    this.inputs = {
      id: 0,
      clinichistory: this.idclinichistory,
      user: Number(sessionStorage.getItem('iduser')),
      date: moment().tz('America/Lima').format('YYYY-MM-DD'),
      delivery_type: '',
      lactation: '',
      lactation_reason: '',
      feeding_bottle: '',
      feeding_bottle_str: '',
      feeding_bottle_nipple: '',
      feeding_bottle_nipple_str: '',
      baby_pacifier: '',
      baby_pacifier_str: '',
      baby_pacifier_nipple: '',
      baby_pacifier_nipple_str: '',
      digital_suction: '',
      digital_suction_str: '',
      onicofagia: '',
      onicofagia_str: '',
      lip_suction: '',
      lip_suction_str: '',
      another_habit: '',
      another_habit_str: '',
      hoarse: '',
      wake_up_several_times: '',
      sleep_mouth_open: '',
      moves_lot: '',
      babea: '',
      grind_teeth: '',
      wakeup_donot_breathe: '',
      has_enuresis: '',
      talk_asleep: '',
      somnolent: '',
      hyperactive: '',
      difficult_focus: '',
      irritates_easily: '',
      fatigue: '',
      headache: '',
      rinitis: '',
      sick_constantly: '',
      tonsillitis: '',
      otitis: '',
      asthma: '',
      hypertrophy: '',
      broncoespasmos: '',
      adenoid_operated: '',
      diagnosis: ''
    }
  }

  onGet(): void{
    this.spinner.show();
    this._mbService.getByClinicHistory(this.idclinichistory).subscribe(
      res => {
        this.spinner.hide();
        this.inputs = res;
      },
      err => {
        this.spinner.hide();
        if(err.error.statusCode !== 404){
          this.toastr.error(
            'Ocurrio un error al obtener los datos',
            'Atención',
            { timeOut: 4000, progressBar: true, closeButton: true}
          );
        }
      }
    );
  }

  onSubmit(): void{
    this.spinner.show();
    //Insert
    if(this.inputs.id === 0){
      this._mbService.insert(this.inputs).subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success(
            'Los datos fueron registrados correctamente',
            'Ok!!',
            { timeOut: 4000, progressBar: true, closeButton: true}
          );
          this.onGet();
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al guardar los datos',
            'Atención',
            { timeOut: 4000, progressBar: true, closeButton: true}
          );
        }
      );
    }else{
      //Update
      this._mbService.update(this.inputs,this.inputs.id).subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success(
            'Los datos fueron actualizados correctamente',
            'Ok!!',
            { timeOut: 4000, progressBar: true, closeButton: true}
          );
          this.onGet();
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al actualizar los datos',
            'Atención',
            { timeOut: 4000, progressBar: true, closeButton: true}
          );
        }
      );
    }
  }

}
