import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageApp } from 'src/app/config/data-table.language';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { FileGroupModel } from 'src/app/models/mat/files-group.model';

import { FilesModel } from 'src/app/models/mat/files-medical-act.model';
import { MedialAttentionService } from 'src/app/service/main/medial-attention.service';
import { environment } from '../../../../environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewPdfComponent } from '../../view-pdf/view-pdf.component';

@Component({
  selector: 'app-clinic-history-files',
  templateUrl: './clinic-history-files.component.html',
  styleUrls: ['./clinic-history-files.component.scss']
})
export class ClinicHistoryFilesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @Input() id: number;
  active: number = 1;
  urlDownload = environment.apiUrlDownload;
  public uploadedFiles: File[] = [];
  quantityFiles: any[] = [];
  listFiles: FilesModel[] = [];
  listGroup: FileGroupModel[] = [];
  group: any;
  description: string = '';

  constructor(
    private _maService: MedialAttentionService,
    private spinner: NgxSpinnerService,
    private _modalSerive: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.group = '';
    this.getListFileGroup();
  }

  getListFileGroup(){
    this.listGroup = [];
    this._maService.getFileGroup().subscribe(
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

  getFilesQuantity(){
    this.spinner.show();
    this.quantityFiles = [];
    this._maService.getQuantityFiles(this.id).subscribe(
      res => {
        this.quantityFiles = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error("Ocurrio un error al obtener los archivos","Error",{timeOut: 3000, progressBar: true});
      }
    );
  }

  getFiles(idgroup: number = 0){
    this.spinner.show();
    this.listFiles = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this._maService.getFilesByClinicHistory(this.id,idgroup).subscribe(
      res => {
        this.listFiles = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error("Ocurrio un error al obtener los archivos","Error",{timeOut: 3000, progressBar: true});
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
    const id = this.id;
    this._maService.uploadFileFromClinicHistory(this.group,id,this.uploadedFiles[0],this.description).subscribe(
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

  onDelete(id: number): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: 'Estś seguro que desea borrar el archivo?',
      type: 'warning',
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: "No, cancelar!",
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete: any) => {
      if (willDelete.value) {
        this.spinner.show();
        this._maService.deleteFile(id)
        .subscribe(
          res => {
            this.getFiles();
            this.spinner.hide();
            this.toastr.success('ok!','Archivo borrado!',{timeOut: 4000, progressBar: true, closeButton: true});
          },
          err => {
            this.spinner.hide();
            this.toastr.error('Atención!','Ocurrio un error al borrar  el Archivo!!',{timeOut: 4000, progressBar: true, closeButton: true});
          }
        );
      }
    });
  }

  onPrint(link: string,title: string,type: string){
    const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
    modal.componentInstance.title = 'Archivo - '+title;
    modal.componentInstance.url = link;
    modal.componentInstance.origin = '';
    modal.componentInstance.id = null;
    modal.componentInstance.type = type;
  }

}
