import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { LanguageApp } from 'src/app/config/data-table.language';

import { ReservationService } from 'src/app/service/main/reservation.service';

@Component({
  selector: 'app-clinic-history-quotes',
  templateUrl: './clinic-history-quotes.component.html',
  styleUrls: ['./clinic-history-quotes.component.scss']
})
export class ClinicHistoryQuotesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @Input() data: any;
  @Output() confirm = new EventEmitter<boolean>();
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    // tslint:disable-next-line: variable-name
    private _reservationService: ReservationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
  }

  confirmQuote(data: any): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea confirmar la cita de las ' + data.appointment + '?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      // console.log(willDelete);
      if (willDelete.value) {
        this._reservationService.confirm(data.id, 2)
        .subscribe(
          res => {
            this.confirm.emit(true);
            Swal.fire('ok!', 'Cita confirmada correctamente', 'success');
          },
          err => {
            Swal.fire('Error!', 'Confirmar la cita', 'error');
          }
        );
      }
    });
  }

  setMedicalAct(data: any): void{
    this.closeModal.emit(true);
    const dataAttention = {
      patient: data.patient,
      id: data.id,
      tariff: data.tariff,
      appointment: data.appointment
    };
    this._reservationService.dataAReservation =  dataAttention;
    this.router.navigateByUrl(`/medical-attention/${data.id}`);
  }
}
