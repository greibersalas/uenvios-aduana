import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private _turn: string;
  constructor() {
    this.getAmPm();
  }

  set turn(ampm: string){
    if(ampm === 'AM'){
      this._turn = 'Buenos días';
    }else{
      this._turn = 'Buenas tardes';
    }
  }

  get turn(): string{
    return this._turn;
  }

  getAmPm(): string{
    this.turn = moment.tz('America/Lima').format('A');
    return moment.tz('America/Lima').format('A');
  }

  getMonthString(month: number): string{
    let stgMonth: string;
    switch (month) {
      case 1:
        stgMonth = 'Enero';
        break;
      case 2:
        stgMonth = 'Febrero';
        break;
      case 3:
        stgMonth = 'Marzo';
        break;
      case 4:
        stgMonth = 'Abril';
        break;
      case 5:
        stgMonth = 'Mayo';
        break;
      case 6:
        stgMonth = 'Junio';
        break;
      case 7:
        stgMonth = 'Julio';
        break;
      case 8:
        stgMonth = 'Agosto';
        break;
      case 9:
        stgMonth = 'Septiembre';
        break;
      case 10:
        stgMonth = 'Octubre';
        break;
      case 11:
        stgMonth = 'Noviembre';
        break;
      case 12:
        stgMonth = 'Diciembre';
        break;
      default:
        stgMonth = 'N/A';
        break;
    }
    return stgMonth;
  }
}
