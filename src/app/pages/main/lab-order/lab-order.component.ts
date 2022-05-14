import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
// Load the full build.
import * as _ from 'lodash';

import { LanguageApp } from 'src/app/config/data-table.language';
import { LabOrderService } from '../../../service/main/lab-order.service';
import { LabOrderModel } from '../../../models/main/labOrder.model';
import { FormLabOrderComponent } from './form/form-lab-order.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';


export interface ProductionModel{
  name: string;
  quanty: number;
  porce: number;
}
@Component({
  selector: 'app-lab-order',
  templateUrl: './lab-order.component.html',
  styleUrls: ['./lab-order.component.scss']
})
export class LabOrderComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  list: LabOrderModel[] = [];
  public moment: any = moment;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  listStates: any[] = [
    {name: 'Colocar Chip'},
    {name: 'Desiste'},
    {name: 'Modificación'},
    {name: 'Nuevo'},
    {name: 'Nuevo Adicional'},
    {name: 'Reparación'}
  ];

  production: ProductionModel[] = [];
  filters: any = {
    sinnce: '',
    until: '',
    state: '0',
    option: 'e'
  };

  constructor(
    private toastr: ToastrService,
    private _labOrderService: LabOrderService,
    private spinner: NgxSpinnerService,
    private _modalSerive: NgbModal,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.filters = {
      since: `${moment().format('YYYY-MM')}-01`,
      until: `${moment().format('YYYY-MM')}-${moment().clone().endOf('month').format('DD')}`,
      state: '0',
      option: 'e'
    }
    this.initPermissions();
    this.get();
    this.getProduction();
    
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

  get(){
    this.list = [];
    this.spinner.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [0],
      orderClasses: true
    };
    this._labOrderService.getFilters(this.filters)
    .subscribe(
      res => {
        res.forEach((item:LabOrderModel) =>{
          this.list.push(item);
        });
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      }
    );
  }

  addForm(id: number){
    const modal = this._modalSerive.open(FormLabOrderComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.get();
        this.getProduction();
      }
    });
    this._labOrderService.id = id;
  }

  delete(id: number): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la orden de laboratorio?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.value) {
          this._labOrderService.delete(id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.get();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el registro', 'error');
            }
          );
          
        }
    });
  }

  confirm(data: LabOrderModel): void{
    let state = 0;
    let stgState = '';
    if(data.state === 1){
      stgState = 'elaboración';
      state = 2;
    }else if(data.state === 2){
      stgState = 'instalación';
      state = 3;
    }
    Swal.fire({
      title: 'Atención!!!!',
      text: `¿Está seguro que desea confirmar la ${stgState} de la orden de laboratorio?`,
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.value) {
          this._labOrderService.confirm(data.id,state)
          .subscribe(
            res => {
              Swal.fire('ok!', 'La orden de laboratorio fue actualizada satisfactoriamente', 'success');
              this.get();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el registro', 'error');
            }
          );
        }
    });
  }

  getProduction(): void{
    this.production = [];
    this._labOrderService.getProduction(this.filters)
    .subscribe(
      res => {
        //console.log("Production ",res);
        const total = res.reduce(function(acc, item){
          return acc + parseInt(item.total);
        },0);
        //console.log("Total ",total);
        this.listStates.forEach(it => {
          let total_item = 0;
          let porc = 0;
          const search = _.find(res,{job:it.name});
          if(search){
            total_item = parseInt(search.total);
            porc = (100*search.total)/total;
          }
          this.production.push({
            name: it.name,
            quanty: total_item,
            porce: porc
          });
        });
      },
      err => {
        console.error("Error al obtener a producción");
      }
    );
  }

  cancel(data: LabOrderModel): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: `¿Está seguro que desea desistir la orden de laboratorio?`,
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.value) {
          this._labOrderService.confirm(data.id,0)
          .subscribe(
            res => {
              Swal.fire('ok!', 'La orden de laboratorio fue actualizada satisfactoriamente', 'success');
              this.get();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el registro', 'error');
            }
          );
        }
    });
  }

  onPrint(){
    this.spinner.show();
    this._labOrderService.getPdfResume(this.filters).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Resumen ordenes laboratorio';
        modal.componentInstance.url = res.link;
        modal.componentInstance.origin = null;
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos de las orden de laboratorio',
        'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }

}
