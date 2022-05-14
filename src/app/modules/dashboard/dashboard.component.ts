import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  session: any = {};
  role = 'BASICO';
  constructor(
    private store: Store<{session: any}>
  ) { }

  ngOnInit(): void {
    this.getSession();
  }

  getSession(): void{
    this.store.select('session')
    .subscribe(
      sess => {
      if (sess.id){
        this.session = sess;
        // console.log('sess.roles', sess);
        // this.role = sess.roles.dashboard;
      }
      },
      err => {
        console.error('Sessión error ', err.error);
      }
    );
  }

}
