import { Component, HostListener, OnInit, ViewChild} from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { ClinicHistoryModel } from 'src/app/models/clinic-history.model';
import { ClinicHistoryService } from '../../service/clinic-history.service';
import { ClinicHistoryFormComponent } from './form/clinic-history-form.component';
import { FormInput } from '../../models/main/clinicHistory.model';
import { LanguageApp } from 'src/app/config/data-table.language';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinic-history',
  templateUrl: './clinic-history.component.html',
  styleUrls: ['./clinic-history.component.scss']
})
export class ClinicHistoryComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dataList: ClinicHistoryModel[] = [];
  public loading: boolean = true;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _chService: ClinicHistoryService,
    private _modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private auth:AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    ) { }

   ngOnInit(): void {
    this.loading = true;
    this.initPermissions();
    this.getAllData();
    this.isBack();
  }

  initPermissions(){
    this.route.data.subscribe(res=>{
      this.auth.hasPermissionsInsert(res.permissions).subscribe(res=>{
        this.can_insert = !res;
      });
      this.auth.hasPermissionsDelete(res.permissions).subscribe(res=>{
        this.can_delete = !res
      });
      this.auth.hasPermissionsUpdate(res.permissions).subscribe(res=>{
        this.can_update = !res
      });

    })
  }

  getRndInteger(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.addForm(0)
    }
  }

  addForm(id: number): void{
    sessionStorage.removeItem('idpatient');
    const modal = this._modalSerive.open(ClinicHistoryFormComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getAllData();
      }
    });
    modal.componentInstance.id = id;
  }

  getAllData(){
    this.loading = true;
    this.dataList = [];
    this.spinner.show();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this._chService.getLista(dataTablesParameters)
          .subscribe((resp:any) => {
            this.dataList = resp.data;
            this.spinner.hide();
            this.loading = false;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'id' }, { data: 'history' },
        { data: 'name' },{ data: 'documentNumber' },
        { data: 'cellphone' },{ data: 'email' },
        {data: ''}
      ],
      language: LanguageApp.spanish_datatables
    };
  }


  delete(tariff: FormInput){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la historia clinica '+tariff.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._chService.delete(tariff.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar la historia clinica', 'error');
            }
          );
        }
    });
  }

  onPrint(data: ClinicHistoryModel){
    this.spinner.show();

    this._chService.getPdf(data.id).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Ficha Nro. '+data.id;
        modal.componentInstance.url = res.link;
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos de la historia clinica',
        'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }

  /**
   * Metodo para verificar si viene de
   * otro modulo para cargar de nuevo
   * los datos de paciente
   */
  isBack(): void{
    const id = Number(sessionStorage.getItem('idpatient'));
    if(id){
      this.addForm(id);
    }
  }
}
