import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

import { LanguageApp } from 'src/app/config/data-table.language';
import { QuotationModel } from 'src/app/models/main/quotation.model';
import { FormInput } from './quotation.model';
import { QuotationFormComponent } from './form/quotation-form.component';
import { QuotationDetailComponent } from './detail/quotation-detail.component';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
import { QuotationTermsComponent } from 'src/app/components/quotation-terms/quotation-terms.component';
import { QuotationService } from '../../service/main/quotation.service';
import { QuotationTermsService } from '../../service/main/quotation-terms.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  public moment: any = moment;
  public loading: boolean = true;
  dataList: QuotationModel[] = [];
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private toastr: ToastrService,
    private _modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private _quotationService: QuotationService,
    private _qtService: QuotationTermsService,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initPermissions();
    this.getAllData();
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'F2'){
      this.addForm(0)
    }
  }

  addForm(id: number): void{
    const modal = this._modalSerive.open(QuotationFormComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getAllData();
      }
    });
    modal.componentInstance.id = id;
  }

  viewDetail(data: FormInput): void{
    const modal = this._modalSerive.open(QuotationDetailComponent,{size: 'xl'});
    modal.componentInstance.data = data;
  }

  getAllData(){
    this.loading = true;
    this.dataList = [];
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this._quotationService.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar las cotizaciones ',err.error);
        this.toastr.error('Atención, ocurrio un error al obtener las cotizaciones!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  delete(id: number): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la Cotización '+id+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this._quotationService.delete(id)
        .subscribe(
          res => {
            Swal.fire('ok!', 'Cotización eliminada satisfactoriamente', 'success');
            this.getAllData();
          },
          err => {
            Swal.fire('Error!', 'No se puedo borrar la cotización', 'error');
          }
        );
      }
    });
  }

  onPrint(data: QuotationModel){
    this.spinner.show();
    this._qtService.get(data.id).subscribe(
      res => {
        if(res.length === 0 && data.specialty.format !== 'OI'){
          this.spinner.hide();
          //Abrir el modal de los terminos
          const modal = this._modalSerive.open(QuotationTermsComponent,{size: 'xl'});
            modal.componentInstance.id = data.id;
            modal.componentInstance.format = data.specialty.format;
            modal.componentInstance.action = 'add';
            modal.result.then((result:any) => {
              if(result === 'Save click'){
                this._quotationService.getPdf(data.id,data.specialty.format).subscribe(
                  res => {
                    this.spinner.hide();
                    const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
                    modal.componentInstance.title = 'Cotización Nro. '+data.id;
                    modal.componentInstance.url = res.link;
                    modal.componentInstance.origin = data.specialty.format;
                    modal.componentInstance.id = data.id;
                  },
                  err => {
                    this.spinner.hide();
                    this.toastr.error('Ocurrio un error al obtener los datos de la orden de cotización',
                    'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
                  }
                );
              }
            });
        }else{
          this._quotationService.getPdf(data.id,data.specialty.format).subscribe(
            res => {
              this.spinner.hide();
              const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
              modal.componentInstance.title = 'Cotización Nro. '+data.id;
              modal.componentInstance.url = res.link;
              modal.componentInstance.origin = data.specialty.format;
              modal.componentInstance.id = data.id;
            },
            err => {
              this.spinner.hide();
              this.toastr.error('Ocurrio un error al obtener los datos de la orden de cotización',
              'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
            }
          );
        }
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los terminos de al cotización',
        'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }

}
