import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Config
import { LanguageApp } from 'src/app/config/data-table.language';
import Swal from 'sweetalert2';

// Components
import { ModalTransportRouteComponent } from '../modals/modal-transport-route/modal-transport-route.component';

// Models
import { TransportRoute } from '../models/transport-route';

// Service
import { TransportRouteService } from '../services/public/transport-route.service';

@Component({
  selector: 'app-transport-route',
  templateUrl: './transport-route.component.html',
  styleUrls: ['./transport-route.component.scss']
})
export class TransportRouteComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  canInsert: true;
  canUpdate: true;
  canDelete: true;

  list: TransportRoute[] = [];

  constructor(
    private modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private TransportRouteService: TransportRouteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  // Datos de la tabla
  get(): void{
    this.spinner.show();
    this.list = [];
    this.TransportRouteService.getAll().subscribe(
      res => {
        this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        language: LanguageApp.spanish_datatables,
        search: true,
        responsive: true,
        order: [0],
        orderClasses: true
      };
        this.list = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        console.error('Error al obtener la programación');
        this.toastr.error('Error al obtener los datos de las rutas de transporte', 'Atención', {timeOut: 3000, progressBar: true});
      }
    );
  }

   // Abre el modal para guardar o editar
   openModal(id: number): void{
    const modal = this.modalSerive.open(ModalTransportRouteComponent, {size: 'lg'});
    modal.result.then((result: any) => {
      if (result === 'Save click'){
        this.get();
      }
    });
    modal.componentInstance.id = id;
  }

  delete(id: number): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el registro?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this.TransportRouteService.delete(id)
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

}
