import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageApp } from 'src/app/config/data-table.language';

import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { FormInput } from '../../../models/main/clinicHistory.model';
import { ClinicHistoryFormComponent } from '../../../pages/clinic-history/form/clinic-history-form.component';

//Helper Services
import { DateService } from '../../../service/helpers/date.service';

@Component({
  selector: 'app-dashboard-reception',
  templateUrl: './dashboard-reception.component.html',
  styleUrls: ['./dashboard-reception.component.scss']
})
export class DashboardReceptionComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  session: any = {};
  greetings: string;

  listCh: ClinicHistoryModel[] = [];
  constructor(private _helperDateService: DateService,private store: Store<{session: any}>,
    private spinner: NgxSpinnerService, private _chService: ClinicHistoryService,
    private toastr: ToastrService, private _modalSerive: NgbModal) { }

  ngOnInit(): void {
    this.getSession();
    this.getClinicHistorys();
  }
  getSession(): void{
      this.store.select('session')
      .subscribe(sess => {   
        if(sess.id){
          this.session = sess;
          console.log("session ",sess);          
          this.setGreetings();
        }         
      });
    }

  setGreetings(): void{
    this.greetings = `<p>${this._helperDateService.turn} <b>${this.session.username}</b>, bienvenido al sistema de Maxillaris</p>`;
  } 

  getClinicHistorys(): void{
    this.spinner.show();
    this.listCh = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this._chService.getAll().subscribe(
      res => {
        this.listCh = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al obtener las Historias Clinicas',
          'Atención',
          {timeOut: 3000, progressBar: true}
        );
      }
    );
  }

  addFormClinicHistory(data: FormInput): void{
    const modal = this._modalSerive.open(ClinicHistoryFormComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getClinicHistorys();
      }
    });
    modal.componentInstance.data = data;
  }

}
