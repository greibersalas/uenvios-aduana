import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';

import { DateService } from 'src/app/service/helpers/date.service';
import { ClinicHistoryFormComponent } from '../../../pages/clinic-history/form/clinic-history-form.component';
import { FormInput } from '../../../models/main/clinicHistory.model';
import { ReservationService } from '../../../service/main/reservation.service';

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.scss']
})
export class DashboardDoctorComponent implements OnInit {

  session: any = {};
  public isCompleteStatus = false;
  public isAssignUsers = false;
  public isRevision = false;

  date: string = moment().format('YYYY-MM-DD');

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
    private store: Store<{session: any}>,private spinner: NgxSpinnerService,
    private _helperDateService: DateService) { }

  ngOnInit(): void {
    this._reservationService.dataAReservation = {};
    this.filter = {
      since: moment().format('YYYY-MM-DD'),
      until: moment().format('YYYY-MM-DD'),
      state: '',
      doctor: 0
    };
    this.getSession();
  }

  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      console.log("Session ",sess);
      if(sess.id){
        this.session = sess;
        this.filter.doctor = sess.doctor.id;
        console.log("filters ", this.filter);
        this.setGreetings();
        this.getReservation();
      }
    });
  }

  setGreetings(): void{
    this.greetings = `<p>${this._helperDateService.turn} <b>${this.session.username}</b>, bienvenido al sistema de Maxillaris</p>`;
  }

  getReservation(): void{
    this.confirmed = 0;
    this.toBeConfirmed = 0;
    this.attended = 0;
    this.spinner.show();
    this.reservations = [];
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
    modal.componentInstance.id = data.id;
  }

  setAtention(data: any): void{
    this._reservationService.dataAReservation =  data;
    this.router.navigateByUrl('/medical-attention');
  }

}
