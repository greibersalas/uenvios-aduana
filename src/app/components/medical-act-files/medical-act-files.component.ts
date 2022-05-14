import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { FilesModel } from 'src/app/models/mat/files-medical-act.model';
import { MedialAttentionService } from 'src/app/service/main/medial-attention.service';
import { ReservationService } from 'src/app/service/main/reservation.service';
import { FileGroupModel } from '../../models/mat/files-group.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-medical-act-files',
  templateUrl: './medical-act-files.component.html',
  styleUrls: ['./medical-act-files.component.scss']
})
export class MedicalActFilesComponent implements OnInit {

  urlDownload = environment.apiUrlDownload;
  active: number = 1;
  dataReservation: any;
  public uploadedFiles: File[] = [];
  listGroup: FileGroupModel[] = [];
  group: any;
  description: string = '';
  listFileClinicHistory: FilesModel[] = [];
  listFiles: FilesModel[] = [];

  constructor(private _medicalService: MedialAttentionService,
    private spinner: NgxSpinnerService,private toastr: ToastrService,
    private _reservationServices: ReservationService) { }

  ngOnInit(): void {
    this.dataReservation = this._reservationServices.dataAReservation;
    this.group = '';
    this.getListFileGroup();
    this.getFiles();
  }

  getListFileGroup(){
    this.listGroup = [];
    this._medicalService.getFileGroup().subscribe(
      res => {
        res.forEach((it:FileGroupModel) => {
          this.listGroup.push(it);
        });
      },
      err => {
        console.error("Error al obtener los datos de los grupos");
      }
    );
  }

  onSubmit(){
    this.spinner.show();
    if(this.uploadedFiles.length === 0){
      this.spinner.hide();
      this.toastr.warning("Debe seleccionar un archivo","Atención",{timeOut: 3000,progressBar: true});
      return;
    }
    if(this.uploadedFiles.length > 1){
      this.spinner.hide();
      this.toastr.warning("Recuerde que solo puede survir un archivo a la vez","Atención",{timeOut: 3000,progressBar: true});
      return;
    }
    const idmedicalact = this._medicalService.idmedicalact;
    this._medicalService.uploadFile(this.group,idmedicalact,this.uploadedFiles[0],this.description).subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success("Archivo cargado correctamente","OK!",{timeOut: 3000,progressBar: true});
        this.group = '';
        this.uploadedFiles = [];
        this.description = '';
        this.getFiles();
      },
      err => {
        this.spinner.hide();
        this.toastr.error("Ocurrio un error al cargar la imagen","Error!!",{timeOut: 3000, progressBar: true});
      }
    );
  }

  getFilesClinicHistory(){
    this.spinner.show();
    this.listFileClinicHistory = [];
    this._medicalService.getFilesByClinicHistory(this.dataReservation.patient.id,0)
    .subscribe(
      res => {
        res.forEach((it: FilesModel) => {
          this.spinner.hide();
          this.listFileClinicHistory.push(it);
        });
      },
      err => {
        this.spinner.hide();
        this.toastr.error("Ocurrio un error al obtener los archivos","Error",{timeOut: 3000, progressBar: true});
      }
    );
  }

  getFiles(){
    this.listFiles = [];
    this._medicalService.getFilesByMedicalAct(this._medicalService.idmedicalact).subscribe(
      res => {
        res.forEach((it:FilesModel) => {
          this.listFiles.push(it);
        });
      },
      err => {
        console.error("Error al obtener los archivos");
        
      }
    );
  }
}
