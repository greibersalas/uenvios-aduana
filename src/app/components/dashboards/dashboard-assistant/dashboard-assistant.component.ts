import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

import { ReservationService } from 'src/app/service/main/reservation.service';

//Helper Services
import { DateService } from '../../../service/helpers/date.service';
import { Router } from '@angular/router';
import { ClinicHistoryFormComponent } from 'src/app/pages/clinic-history/form/clinic-history-form.component';
import { FormInput } from 'src/app/models/main/clinicHistory.model';

@Component({
  selector: 'app-dashboard-assistant',
  templateUrl: './dashboard-assistant.component.html',
  styleUrls: ['./dashboard-assistant.component.scss']
})
export class DashboardAssistantComponent implements OnInit {

  session: any = {};

  public isCompleteStatus = false;
  public isAssignUsers = false;
  public isRevision = false;

  date: string = moment().format('YYYY-MM-DD');
  iddoctor: number = 7;

  reservations: any[] = [];
  toBeConfirmed: number = 0;
  confirmed: number = 0;
  attended: number = 0;
  filter = {
    since: '',
    until: '',
    state: '',
    doctor: 0
  }
  listState: any[] = [
    {id: '0', name: 'Todos'},
    {id: '1', name: 'Por Confirmar'},
    {id: '2', name: 'Confirmado'},
    {id: '3', name: 'Atendidos'}
  ];
  greetings: string;
  constructor(private _reservationService: ReservationService,
    private _modalSerive: NgbModal,private router:Router,
    private _helperDateService: DateService,private store: Store<{session: any}>,
    private spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getSession();
    this._reservationService.dataAReservation = {};
    this.filter = {
      since: moment().format('YYYY-MM-DD'),
      until: moment().format('YYYY-MM-DD'),
      state: '',
      doctor: 0
    }
  }
  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      if(sess.id){
        this.session = sess;
        this.setGreetings();
      }
    });
  }

  setGreetings(): void{
    this.greetings = `<p>${this._helperDateService.turn} <b>${this.session.username}</b>, bienvenido al sistema de Maxillaris</p>`;
  }

  getReservation(id: number = 0): void{
    this.confirmed = 0;
    this.toBeConfirmed = 0;
    this.attended = 0;
    this.spinner.show();
    this._reservationService.getByDateDoctor(this.filter)
    .subscribe(
      res => {
        res.forEach((item:any) => {
          this.reservations.push(item);
          if(item.state === 1){
            this.toBeConfirmed ++;
          }else if(item.state === 2){
            this.confirmed ++;
          }else if(item.state === 3){
            this.attended ++;
          }
        });
        this.spinner.hide();
      },
      error => {
        console.error("Error al obtener las reservaciones ",error.error);
        this.spinner.hide();
      }
    );
  }

  getClinicHistory(data: FormInput): void{
    const modal = this._modalSerive.open(ClinicHistoryFormComponent,{size: 'xl'});
    modal.componentInstance.data = data;
  }

  setAtention(data: any): void{
    this._reservationService.dataAReservation =  data;
    this.router.navigateByUrl('/medical-attention');
  }

}
