import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// Load the full build.
import * as _ from 'lodash';

import { TariffModel } from 'src/app/models/tariff.model';
import { Detail } from '../odontograma/odontograma.component';


export interface QuotationDetail{
  idDentalStatus: number,
  idtariff: number,
  quantity: number,
  tariff: TariffModel
}
 @Component({
  selector: 'app-odontogramas',
  templateUrl: './odontogramas.component.html',
  styleUrls: ['./odontogramas.component.scss']
})
export class OdontogramasComponent implements OnInit {

  @Input() data: any;

  active = 1;
  teethsDecrement: number[] = [8,7,6,5,4,3,2,1];
  teethsInclement: number[] = [1,2,3,4,5,6,7,8];
  extractDecrement: any[] = ['21.25ex','18.85ex','16.48ex','14.08ex','11.70ex','9.30ex','6.95ex','4.58ex'];
  extractIncrement: any[] = ['4.58ex','6.95ex','9.30ex','11.70ex','14.08ex','16.48ex','18.85ex','21.25ex'];
  extractMilkDecrement: any[] = ['7.3ex','10.85ex','14.4ex','18ex','21.55ex'];
  extractMilkIncrement: any[] = ['32ex','28.4ex','24.9ex','21.3ex','17.7ex'];

  toothStatus: any;
  quadrant: number;
  opc: number;
  teeth: number;
  teethArr: any[] =[];

  detail: Detail[] = [];
  detailTeeth: any[] = [];

  quotationDetail: QuotationDetail[] = [];
  idtariff: number;
  tariff: TariffModel;

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.data.id === 0){
      this.setQuadrantDetail();
    }else{
      this.detail = JSON.parse(this.data.name);
    }
    //console.log("Detalle del odonotgrama ",JSON.parse(this.data.name));
  }

  /**
   * Vamos creando las selecciones
   * del odontograma
   */
  setTeeth(quadrant: number, teeth: number, zone: string): void{
    if(this.data.id > 0){
      this.toastr.info('No puede modificar el odontograma!!', 'Atención', {
        timeOut: 3000,
      });

      return;
    }
    if(this.toothStatus.id > 0){
      this.opc = this.toothStatus.id;
      this.teeth = teeth;
      this.detail[quadrant].teeth.forEach( tt => {
        if(tt.id === teeth){
          if(this.toothStatus.id === 5 || this.toothStatus.id === 3){
            tt.t.state = true;
            tt.t.toothStatus = this.toothStatus.id;
            tt.l.state = true;
            tt.l.toothStatus = this.toothStatus.id;
            tt.b.state = true;
            tt.b.toothStatus = this.toothStatus.id;
            tt.r.state = true;
            tt.r.toothStatus = this.toothStatus.id;
            if(this.toothStatus.id === 3){
              tt.c.state = true;
              tt.c.toothStatus = this.toothStatus.id;
            }
          }else{
            if(zone === 't'){
              tt.t.state = true;
              tt.t.toothStatus = this.toothStatus.id;
            }else if(zone === 'l'){
              tt.l.state = true;
              tt.l.toothStatus = this.toothStatus.id;
            }else if(zone === 'b'){
              tt.b.state = true;
              tt.b.toothStatus = this.toothStatus.id;
            }else if(zone === 'r'){
              tt.r.state = true;
              tt.r.toothStatus = this.toothStatus.id;
            }else if(zone === 'c'){
              tt.c.state = true;
              tt.c.toothStatus = this.toothStatus.id;
            }
          }
          this.setQuotationDetail(this.toothStatus.id);
        }
          
      });
      //console.log("Cuadrantes ",this.detail);
    }else{
      this.toastr.error('Debe seleccionar  un estado dental!!', 'Atención', {
        timeOut: 3000,
      });
    }    
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
  setQuotationDetail(id: number): void{
    //Busco si ya hay registrado
    const detail = _.findIndex(this.quotationDetail,{idDentalStatus:id});
    if(detail >= 0){
      this.quotationDetail[detail].quantity += 1;
    }else{
      this.quotationDetail.push({
        idDentalStatus: id,
        tariff: this.tariff,
        idtariff: this.idtariff,
        quantity: 1
      });
    }
    console.log("Detail ",this.quotationDetail);
  }

}
