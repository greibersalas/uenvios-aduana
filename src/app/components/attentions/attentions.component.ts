import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageApp } from 'src/app/config/data-table.language';

// Services
import { MedicalActAttentionService } from 'src/app/service/main/medical-act-attention.service';
import { ReservationService } from 'src/app/service/main/reservation.service';

@Component({
  selector: 'app-attentions',
  templateUrl: './attentions.component.html',
  styleUrls: ['./attentions.component.scss']
})
export class AttentionsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @Input() id: number;
  @Output() closeModal = new EventEmitter<boolean>();
  list: any[] = [];
  quantityAttentions: any[] = [];
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private reservationService: ReservationService,
    private router: Router,
    private maaService: MedicalActAttentionService,
  ) { }

  ngOnInit(): void {
    this.getQuantityAttentions();
  }

  getQuantityAttentions(): void{
    this.quantityAttentions = [];
    this.maaService.getQuantityAttentions(this.id)
    .subscribe(
      res => {
        this.quantityAttentions = res;
      },
      err => { console.log({err});
    });
  }
  get(iddoctor: number = 0): void{
    this.spinner.show();
    this.list = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this.maaService.getByCH(this.id, iddoctor)
    .subscribe(
      res => {
        this.list = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al obtener las atenciones',
          'Atención',
          {timeOut: 3000, progressBar: true}
        );
      }
    );
  }

  setMedicalAct(data: any): void{
    this.closeModal.emit(true);
    const dataAttention = {
      patient: data.reservation.patient,
      id: data.reservation.id,
      tariff: data.reservation.tariff
    };
    this.reservationService.dataAReservation =  dataAttention;
    this.router.navigateByUrl('/medical-attention');
  }

}
