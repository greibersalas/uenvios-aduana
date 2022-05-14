import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
// Load the full build.
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { DentalStatus } from 'src/app/models/mat/dental-status.model';
import { TariffModel } from 'src/app/models/tariff.model';
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { DentalStatusService } from 'src/app/service/mat/dental-status.service';
import { TariffService } from 'src/app/service/tariff.service';
import { OdontograModel } from 'src/app/models/main/clinicHistory.model';
export interface Teerh{
  id: number,
  t: {state: boolean, toothStatus: number},
  l: {state: boolean, toothStatus: number},
  b: {state: boolean, toothStatus: number},
  r: {state: boolean, toothStatus: number},
  c: {state: boolean, toothStatus: number}
}
export interface Detail{
  quadrant: number,
  teeth?: Teerh[]
}

export interface QuotationDetail{
  idDentalStatus: number,
  dentalstatus: any,
  idtariff: number,
  quantity: number,
  tariff: TariffModel
}
@Component({
  selector: 'app-odontograma',
  templateUrl: './odontograma.component.html',
  styleUrls: ['./odontograma.component.scss']
})
export class OdontogramaComponent implements OnInit {

  @Input() data: any;
  @Input() first: boolean;
  @Input() origin: string;
  @Output() saved = new EventEmitter<any>();
  @Output() active = new EventEmitter<number>();
  @Input() odontograma: any;

  teethsDecrement: number[] = [8,7,6,5,4,3,2,1];
  teethsInclement: number[] = [1,2,3,4,5,6,7,8];
  extractDecrement: any[] = ['21.25ex','18.85ex','16.48ex','14.08ex','11.70ex','9.30ex','6.95ex','4.58ex'];
  extractIncrement: any[] = ['4.58ex','6.95ex','9.30ex','11.70ex','14.08ex','16.48ex','18.85ex','21.25ex'];

  extractMilkDecrement: any[] = ['7.3ex','10.85ex','14.4ex','18ex','21.55ex'];
  extractMilkIncrement: any[] = ['32ex','28.4ex','24.9ex','21.3ex','17.7ex'];

  quadrant: number;
  opc: number;
  teeth: number;
  teethArr: any[] =[];

  puenteC1 = 45;
  leftPuenteC1 = 100;

  dentalStatus : DentalStatus[] = [];
  toothStatus: any;

  detail: Detail[] = [];
  detailTeeth: any[] = [];

  toExtract: number = 2.18;
  strToExtract: string = '';

  quotationDetail: QuotationDetail[] = [];
  idtariff: number;
  tariff: TariffModel;
  tariffs: TariffModel[] = [];
  listTariffs: TariffModel[] = [];

  idodontograma: number = 0;
  dateRegister: string = '';

  constructor(private _tariffService: TariffService,private _dentalStatusService: DentalStatusService,
    private toastr: ToastrService,private _chService: ClinicHistoryService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if(this.odontograma){
      this.detail = JSON.parse(this.odontograma);
      this.getTariffs();
    }
    this.idtariff = 0;
    this.setDentalStatus();
    this.toothStatus = '';
    this.setQuadrantDetail();
    //console.log("Datos del paciente ",this.data);
    if(this.first){
      this.getFirst();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F3'){
      this.save()
    }
  }

  setDetailTreatment(){
    this.detail.forEach(async (i: any) =>{
      await Promise.all(i.teeth.map(async (j: any) =>{
        //console.log("j",j);
        //bottom
        if(j.b.state){
          this.toothStatus = j.b.toothStatus;
          let tariff = _.find(this.tariffs,function(o){
            if(o.dental_status){
              return o.dental_status.id === j.b.toothStatus;
            }
          });
          this.tariff = tariff;
          this.idtariff = tariff.id;
          this.setQuotationDetail(j.b.toothStatus,true);
        }
        //Top
        if(j.t.state){
          this.toothStatus = j.t.toothStatus;
          let tariff = _.find(this.tariffs,function(o){
            if(o.dental_status){
              return o.dental_status.id === j.t.toothStatus;
            }
          });
          this.tariff = tariff;
          this.idtariff = tariff.id;
          this.setQuotationDetail(j.t.toothStatus,true);
        }
        //left
        if(j.l.state){
          this.toothStatus = j.l.toothStatus;
          let tariff = _.find(this.tariffs,function(o){
            if(o.dental_status){
              return o.dental_status.id === j.l.toothStatus;
            }
          });
          this.tariff = tariff;
          this.idtariff = tariff.id;
          this.setQuotationDetail(j.l.toothStatus,true);
        }
        //right
        if(j.r.state){
          this.toothStatus = j.r.toothStatus;
          let tariff = _.find(this.tariffs,function(o){
            if(o.dental_status){
              return o.dental_status.id === j.r.toothStatus;
            }
          });
          this.tariff = tariff;
          this.idtariff = tariff.id;
          this.setQuotationDetail(j.r.toothStatus,true);
        }
        //Center
        if(j.c.state){
          this.toothStatus = j.c.toothStatus;
          let tariff = _.find(this.tariffs,function(o){
            if(o.dental_status){
              return o.dental_status.id === j.c.toothStatus;
            }
          });
          this.tariff = tariff;
          this.idtariff = tariff.id;
          this.setQuotationDetail(j.c.toothStatus,true);
        }
      }));
    });
  }

  getFirst(){
    this._chService.getFirstOdontograma(this.data.id)
    .subscribe(
      res => {
        if(res.length > 0){
          this.idodontograma = res[0].id;
          this.dateRegister = res[0].createdAt;
          this.detail = JSON.parse(res[0].name);
          this.active.emit(2);
        }else{
          this.active.emit(1);
        }
      },
      error => {
        console.error("Error al obtener odontograma", error.error);
      }
    );
  }

  /**
   * Vamos creando las selecciones
   * del odontograma
   */
  setTeeth(quadrant: number, teeth: number, zone: string): void{
    if(this.toothStatus > 0){
      if(Number(this.idtariff) === 0){
        this.toastr.error('Debe seleccionar  un tratamiento!!', 'Atención', {
          timeOut: 4000, progressBar: true, closeButton: true
        });
        return
      }
      this.opc = Number(this.toothStatus);
      this.teeth = teeth;
      let state: boolean = false;
      this.detail[quadrant].teeth.forEach( tt => {
        if(tt.id === teeth){
          if(this.opc === 5 || this.opc === 3 || this.opc === 8 || this.opc === 9
          || this.opc === 16 || this.opc === 17 || this.opc === 18 || this.opc === 19 || this.opc === 20
          || this.opc === 21 || this.opc === 22 || this.opc === 25){
            tt.t.state = tt.t.state ? false : true;
            state = tt.t.state;
            tt.t.toothStatus = !tt.t.toothStatus ? this.opc : null;
            tt.l.state = tt.l.state ? false : true;
            tt.l.toothStatus = !tt.l.toothStatus ? this.opc : null;
            tt.b.state = tt.b.state ? false : true;
            tt.b.toothStatus = !tt.b.toothStatus ? this.opc : null;
            tt.r.state = tt.r.state ? false : true;
            tt.r.toothStatus = !tt.r.toothStatus ? this.opc : null;
            if(this.opc === 3 || this.opc === 8 || this.opc === 16 || this.opc === 17 || this.opc === 18 || this.opc === 19 || this.opc === 20
              || this.opc === 21 || this.opc === 22 || this.opc === 25){// PARA EXTRACCIÓN BORDER RED
              tt.c.state = tt.c.state ? false : true;
              tt.c.toothStatus = !tt.c.toothStatus ? this.opc : null;
            }
          }else{
            if(zone === 't'){
              tt.t.state = tt.t.state ? false : true;
              state = tt.t.state;
              tt.t.toothStatus = !tt.t.toothStatus ? this.opc : null;
            }else if(zone === 'l'){
              tt.l.state = tt.l.state ? false : true;
              state = tt.l.state;
              tt.l.toothStatus = !tt.l.toothStatus ? this.opc : null;
            }else if(zone === 'b'){
              tt.b.state = tt.b.state ? false : true;
              state = tt.b.state;
              tt.b.toothStatus = !tt.b.toothStatus ? this.opc : null;
            }else if(zone === 'r'){
              tt.r.state = tt.r.state ? false : true;
              state = tt.r.state;
              tt.r.toothStatus = !tt.r.toothStatus ? this.opc : null;
            }else if(zone === 'c'){
              tt.c.state = tt.c.state ? false : true;
              state = tt.c.state;
              tt.c.toothStatus = !tt.c.toothStatus ? this.opc : null;
            }
          }
          this.setQuotationDetail(this.opc,state);
        }
      });
      //console.log("Cuadrantes ",this.detail);
    }else{
      this.toastr.error('Debe seleccionar  un estado dental!!', 'Atención', {
        timeOut: 4000, progressBar: true, closeButton: true
      });
    }
  }

  /**
   * Select estado dental
   */
  setDentalStatus(): void{
    this.dentalStatus = [];
    this._dentalStatusService.getAll()
    .subscribe(
      res => {
        this.dentalStatus = res;
        if(this.odontograma){
          this.setDetailTreatment();
        }
      },
      error => {}
    );
  }

  /**
   * Crear la estructura base del odontograma
   */
  setQuadrantDetail(){
    this.teethsInclement.forEach( i =>{
      this.teethArr = [];
      // Teeth adult
      if(i<=4){
        this.teethsInclement.forEach(j => {
          this.teethArr.push({
            id:j,
            t: {state: false, toothState: 0},
            l: {state: false, toothState: 0},
            b: {state: false, toothState: 0},
            r: {state: false, toothState: 0},
            c: {state: false, toothState: 0}
          });
        });
      // Teeth milk
      }else{
        this.teethsInclement.forEach(j => {
          if(j<=5){
            this.teethArr.push({
              id:j,
              t: {state: false, toothState: 0},
              l: {state: false, toothState: 0},
              b: {state: false, toothState: 0},
              r: {state: false, toothState: 0},
              c: {state: false, toothState: 0}
            });
          }
        });
      }
      this.detail.push({quadrant: i, teeth: this.teethArr});
    });
    //console.log("detail quadrant ",this.detail);
  }

  /***
   * Creamos el detalle que se creara en la cotización
   */
  setQuotationDetail(id: number, state: boolean): void{
    //Busco si ya hay registrado
    const detail = _.findIndex(this.quotationDetail,{idDentalStatus:id});
    if(detail >= 0){
      if(state){
        this.quotationDetail[detail].quantity += 1;
      }else{
        this.quotationDetail[detail].quantity -= 1;
        if(this.quotationDetail[detail].quantity <= 0){
          this.quotationDetail.splice(detail,1);
        }
      }
    }else{
      this.quotationDetail.push({
        idDentalStatus: id,
        dentalstatus: _.find(this.dentalStatus,{id}),
        tariff: _.find(this.listTariffs,{id: Number(this.idtariff)}),//this.tariff,
        idtariff: this.idtariff,
        quantity: 1
      });
    }
    //console.log("Detail ",this.quotationDetail);
  }

  save(): void{
    if(this.quotationDetail.length === 0){
      this.toastr.warning(
        'No ha seleccionado ningún tratamiento',
        'Atención!',
        {timeOut: 3000, progressBar: true}
      );
      return;
    }
    this.spinner.show();
    //SI EL REGISTRO ES DE LA HISTORIA CLINICA
    if(this.origin === 'CH'){
      const data: OdontograModel = {
        name: JSON.stringify(this.detail),
        clinichistory: this.data.id
      }
      this._chService.addOdontograma(data)
      .subscribe(
        res => {
          this.getFirst();
          this.spinner.hide();
          this.toastr.success(
            'Odontograma registrado correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
          this.saved.emit({ok:true});
        },
        err => {
          this.toastr.error(
            'Error al registrar el odontograma',
            'Atención!',
            {timeOut: 3000, progressBar: true}
          );
        }
      );
    //odontograma desde la corización
    }else if(this.origin === 'QT'){
      this.spinner.hide();
      this.toastr.success(
        'Odontograma registrado correctamente',
        'Ok!',
        {timeOut: 3000, progressBar: true}
      );
      const response = {
        ok: true,
        odontograma: JSON.stringify(this.detail),
        detail: this.quotationDetail
      }
      this.saved.emit(response);
      //this.activeModal.close(response);
    }
  }

  /**
   * Busco la tarifa del estado dental
   */
  async getTariff(){
    if(this.toothStatus > 0){
      this._tariffService.getByDentalStatus(this.toothStatus)
      .subscribe(
        res => {
          this.listTariffs = res;
          /* this.tariff = res;
          this.idtariff = res.id; */
          //console.log("Tariff ",res);
        },
        error => {
          console.error("Error tariff ",error.error);
        }
      );
    }else{
      this.idtariff = 0;
    }
  }

  /**
   * Busco la tarifa del estado dental
   */
   async getTariffs(){
    this.tariffs = [];
    this._tariffService.getAll()
    .subscribe(
      res => {
        this.tariffs = res;
      },
      error => {
        console.error("Error tariff ",error.error);
      }
    );
  }

}
