import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Models
import { ClinicHistoryNotesModel } from 'src/app/models/main/clinicHistoryNotes.model';


// Components
import { AddClinicHistoryNotesComponent } from '../../add-clinic-history-notes/add-clinic-history-notes.component';

// Services
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinic-history-notes',
  templateUrl: './clinic-history-notes.component.html',
  styleUrls: ['./clinic-history-notes.component.scss']
})
export class ClinicHistoryNotesComponent implements OnInit {

  @Input() idch: number;

  notes: ClinicHistoryNotesModel[] = [];
  loadingNotes: boolean = true;
  loading: boolean = true;

  constructor(
    private _chService: ClinicHistoryService,
    private modalSerive: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getNotes()
  }

  onForm(id: number): void{
    const modal = this.modalSerive.open(AddClinicHistoryNotesComponent,{});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getNotes();
      }
    });
    modal.componentInstance.id = id;
    modal.componentInstance.idch = this.idch;
  }

  getNotes(): void{
    this.notes = [];
    this.loadingNotes = true;
    this._chService.getNotes(this.idch)
    .subscribe(
      res => {
        this.notes = res;
        this.loadingNotes = false;
      },
      error => {
        this.loadingNotes = false;
        this.toastr.error('Al cargar las notas del paciente!!', 'Error!', {
          timeOut: 3000,
        });
        console.error("Error get notes ",error.error);
      }
    );
  }

}
