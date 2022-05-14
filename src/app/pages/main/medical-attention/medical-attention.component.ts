import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOdontogramaComponent } from 'src/app/components/add-odontograma/add-odontograma.component';

import { ClinicHistoryNotesModel } from 'src/app/models/main/clinicHistoryNotes.model';
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { MedialAttentionService } from 'src/app/service/main/medial-attention.service';
import { ReservationService } from 'src/app/service/main/reservation.service';
import { AddClinicHistoryNotesComponent } from '../../../components/add-clinic-history-notes/add-clinic-history-notes.component';


@Component({
  selector: 'app-medical-attention',
  templateUrl: './medical-attention.component.html',
  styleUrls: ['./medical-attention.component.scss']
})
export class MedicalAttentionComponent implements OnInit {
  idreservation: number;
  public isCompleteStatus = false;
  public isAssignUsers = true;
  public isRevision = true;
  active = 1;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  dataReservation: any;
  odontogramas: any[] = [];
  notes: ClinicHistoryNotesModel[] = [];
  disabled = false;

  constructor(
    // tslint:disable-next-line: variable-name
    private _reservationServices: ReservationService,
    // tslint:disable-next-line: variable-name
    private _chService: ClinicHistoryService,
    // tslint:disable-next-line: variable-name
    private _modalSerive: NgbModal,
    // tslint:disable-next-line: variable-name
    private _maService: MedialAttentionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idreservation = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
    if (this._maService.idmedicalact > 0){
      this.disabled = true;
    }
  }

  getData(): void{
    this._reservationServices.getById(this.idreservation)
    .subscribe(
      resp => {
        // console.log({resp});
        this.dataReservation = resp;
        if (!this.dataReservation.tariff){
          this.dataReservation.tariff = {};
          this.dataReservation.tariff.name = '';
        }
      },
      err => {
        console.log({err});
      }
    );
  }

  getOdontogramas(): void{
    this.odontogramas = [];
    this._chService.getOdontograma(this.dataReservation.patient.id)
    .subscribe(
      res => {
        res.forEach((item: any) => {
          this.odontogramas.push(item);
        });
      },
      error => {}
    );
    // this.carousel.pause();
  }

  /* getNotes(): void{
    this.notes = [];
    this._chService.getNotes(this.dataReservation.patient.id)
    .subscribe(
      res => {
        res.forEach((note: ClinicHistoryNotesModel) => {
          this.notes.push(note);
        });
      },
      error => {
        console.error('Error get notes ', error.error);
      }
    );
  } */

  /* addNotes(): void{
    const modal = this._modalSerive.open(AddClinicHistoryNotesComponent, {});
    modal.result.then((result: any) => {
      if (result === 'Save click'){
        this.getNotes();
      }
    });
    modal.componentInstance.id = this.dataReservation.patient.id;
  } */

  addOdontograma(): void{
    const modal = this._modalSerive.open(AddOdontogramaComponent, {size: 'xl'});
    modal.result.then((result: any) => {
      if (result.ok){
        this.getOdontogramas();
      }
    });
    modal.componentInstance.data = this.dataReservation.patient;
    modal.componentInstance.origin = 'CH';
  }

  onBackCH(): void{
    sessionStorage.setItem('idpatient', this.dataReservation.patient.id);
  }
}
