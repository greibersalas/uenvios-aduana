import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { DateService } from '../../../service/helpers/date.service';

@Component({
  selector: 'app-dashboard-basic',
  templateUrl: './dashboard-basic.component.html',
  styleUrls: ['./dashboard-basic.component.scss']
})
export class DashboardBasicComponent implements OnInit {

  session: any = {};
  greetings: string;
  time: any;
  constructor(
    private helperDateService: DateService,
    private store: Store<{session: any}>
  ) {}

  ngOnInit(): void {
    this.getSession();
    this.getCurrentDate();
  }
  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      if (sess.id){
        this.session = sess;
        this.setGreetings();
      }
    });
  }

  setGreetings(): void{
    this.greetings = `<p>${this.helperDateService.turn}
    <b>${this.session.username}</b>, bienvenido al sistema de U-ENVIOS</p>`;
  }

  getCurrentDate(): void{
    setInterval(() => {
      this.time = new Date();
    }, 1000); // set it every one seconds
  }

}
