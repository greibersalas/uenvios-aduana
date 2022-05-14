import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AttentionCardModel } from "../../../models/attention-card.model";
import { AttentionCardService } from "../../../service/attention-card.service";
import { ViewPdfComponent } from '../../view-pdf/view-pdf.component';


@Component({
  selector: 'app-attention-card',
  templateUrl: './attention-card.component.html',
  styleUrls: ['./attention-card.component.scss']
})
export class AttentionCardComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private _attentionService:AttentionCardService,
    private toastr: ToastrService,private _modalSerive: NgbModal
  ) { }

  formInputs:AttentionCardModel
  session: any = {};
  @Input() idclinichistory: number;

  ngOnInit(): void {
    this.clear();
    this.get()
  }

  get(): void{
    this.spinner.show();
    this._attentionService.getByClinicHistory(this.idclinichistory)
    .subscribe(
      res => {
        this.spinner.hide();
        this.formInputs = res;
      },
      err => {
        this.spinner.hide();
        if(err.error.statusCode !== 404){
          this.toastr.error(
            'Ocurrio un error al obtener la Ficha de Atención',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      }
    );
  }

  clear(){
    this.formInputs={
      id:0,
      motivo:'',
      dateadmission: moment().format('YYYY-MM-DD'),
      clinichistory:0,
      ma:false,
      mm:false,
      mmp:false,
      mp:false,
      af:false,
      ar:false,
      asc:false,
      dcb:false,
      dtm:false,
    }
  }

  onSubmit(): void{
    this.spinner.show();
    if(this.formInputs.id > 0){
      //update
      this._attentionService.update(this.formInputs,this.formInputs.id)
      .subscribe(
        res => {
          this.formInputs = res;
          this.spinner.hide();
          this.toastr.success(
            'Ficha de atención editada correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al editar la Ficha de atención',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }else{
      //insert Ficha de atención
      this.formInputs.clinichistory = this.idclinichistory
      this._attentionService.insert(this.formInputs)
      .subscribe(
        res => {
          this.formInputs = res;
          this.spinner.hide();
          this.toastr.success(
            'Ficha de atención registrada correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al insertar la Ficha de atención',
            'Atención',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    }
  }

  onPrint(){
    this.spinner.show();
    this._attentionService.getPdf(this.formInputs.id).subscribe(
      res => {
        this.spinner.hide();
        console.log(res);
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Ficha de evaluación de ingreso';
        modal.componentInstance.url = res.link;
      },
      err => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos de la ficha de evaluación',
        'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }
}



