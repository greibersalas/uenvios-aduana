import { Component, Input, OnInit } from '@angular/core';

// Libraries
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

// Models
import { ClinicHistoryNotesModel } from 'src/app/models/main/clinicHistoryNotes.model';
import { DoctorModel } from 'src/app/models/doctor.model';

// Services
import { ClinicHistoryService } from 'src/app/service/clinic-history.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/service/doctor.service';


@Component({
  selector: 'app-add-clinic-history-notes',
  templateUrl: './add-clinic-history-notes.component.html',
  styleUrls: ['./add-clinic-history-notes.component.scss']
})
export class AddClinicHistoryNotesComponent implements OnInit {

  @Input() id: number;
  @Input() idch: number;
  formInput: ClinicHistoryNotesModel;
  loaderInsert: boolean = false;
  title = 'Nueva nota';
  doctorList: DoctorModel[] = [];

  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private doctorService: DoctorService,
    private spinner: NgxSpinnerService,
    private chService: ClinicHistoryService,
    private toastr: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.formInput = {
      id: this.id,
      clinichistory: this.idch,
      doctor: 0,
      title: '',
      note: ''
    };
    this.getDoctors();
    if ( this.id > 0 ) {
      this.title = 'Editar nota';
      this.onGet();
    }
  }

  onSubmit() {
    if (this.id === 0){
      if (this.formInput.doctor === 0){
        this.toastr.warning(
          'Debe seleccionar un doctor',
          'Atención',
          {
            timeOut: 3500,
            closeButton: true,
            progressBar: true
          }
        );
        return;
      }
      this.spinner.show();
      this.chService.insertNote(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Nota agregada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.formInput = res;
          this.activeModal.close('Save click');
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al agregar la nota!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.chService.updateNote(this.id,this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Nota agregada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.formInput = res;
          this.activeModal.close('Save click');
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Ha courrido un error al actualizar la nota!!', 'Error!', {
            timeOut: 3000,
          });
        }
      );
    }
  }

  onGet(): void{
    this.spinner.show();
    this.chService.getNote(this.id)
    .subscribe(
      res => {
        this.spinner.hide();
        this.formInput = res;
        this.formInput.doctor = res.doctor.id;
      },
      error => {
        this.spinner.hide();
      }
    );
  }

  getDoctors(){
    this.doctorList = [];
    this.doctorService.getAll()
    .subscribe(
      res =>{
        this.doctorList = res;
        //this.formInput.doctor = iddoctor;
      },
      err => {
        console.log(err.error);
      }
    );
  }

}
