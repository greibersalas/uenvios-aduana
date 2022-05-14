import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LanguageApp } from 'src/app/config/data-table.language';

// Models
import { DoctorModel } from 'src/app/models/doctor.model';

// Services
import { DoctorService } from 'src/app/service/doctor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReservationService } from '../../service/main/reservation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-diary-list',
  templateUrl: './diary-list.component.html',
  styleUrls: ['./diary-list.component.scss']
})
export class DiaryListComponent implements OnInit {

  @Input() patient: number;
  @Input() doctor: number;
  @Input() state: number;
  @Input() date: string;
  dtOptions: DataTables.Settings = {};
  list: any[] = [];
  filters: any = {
    since: moment().subtract(30,'days').format('YYYY-MM-DD'),
    until: moment().format('YYYY-MM-DD'),
    state: 0,
    doctor: 0
  };
  listState: any[] = [];
  loadingSelectStateFilter: boolean;
  listDoctors: DoctorModel[] = [];
  loadingSelectDoctor: boolean;

  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService, private toastr: ToastrService,
    private serviceDoctor: DoctorService,
    private _reservationService: ReservationService
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    this.getDoctors();
    this.setStatesFilter();
    this.filters.state = this.state;
    this.filters.doctor = this.doctor;
    this.get();
  }

  get(): void{
    this.spinner.show();
    this.list = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [3],
      orderClasses: true
    };
    this._reservationService.getListFilter(
      this.patient,
      this.filters.doctor,
      this.filters.state,
      this.filters.since,
      this.filters.until
    ).subscribe(
      res => {
        this.list = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al obtener las citas',
          'Atención',
          {timeOut: 4000, progressBar: true, closeButton: true}
        );
      }
    );
  }

  setState(st: number): string{
    let state: string;
    if(st === 1){
      //state = 'Por confirmar';
      state = `<span class="badge m-r-5 badge-light-warning">Por Confirmar</span>`;
    }else if(st === 2){
      //state = 'Confirmado';
      state = `<span class="badge m-r-5 badge-light-success">Confirmado</span>`;
    }else if(st === 3){
      //state = 'Atendido';
      state = `<span class="badge m-r-5 badge-light-primary">Atendido</span>`;
    }else{
      state = '';
    }
    return state;
  }

  setStatesFilter(){
    this.loadingSelectStateFilter = true;
    this.listState = [
      {
        id: 0,
        state: "Todos"
      },
      {
        id: 1,
        state: "Por confirmar"
      },
      {
        id: 2,
        state: "Confirmado"
      },
      {
        id: 3,
        state: "Atendido"
      },
    ];
    this.loadingSelectStateFilter = false;
  }

  getDoctors(){
    this.loadingSelectDoctor = true;
    this.listDoctors = [];
    this.serviceDoctor.getAll()
    .subscribe(
      (res: DoctorModel[]) =>{
        this.listDoctors = res;
        this.listDoctors.unshift({ id: 0, nameQuote: 'Todos'});
        this.loadingSelectDoctor = false;
      },
      (err: HttpErrorResponse) => {
        this.loadingSelectDoctor = false;
        console.log(err.error);
      }
    );
  }

}
