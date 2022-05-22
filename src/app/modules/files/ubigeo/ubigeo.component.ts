import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

// Config
import { LanguageApp } from 'src/app/config/data-table.language';

// Components
import { ModalUbigeoComponent } from '../modals/modal-ubigeo/modal-ubigeo.component';

// Models
import { Ubigeo } from '../models/ubigeo.model';

// Service
import { UbigeoService } from '../services/public/ubigeo.service';


@Component({
  selector: 'app-ubigeo',
  templateUrl: './ubigeo.component.html',
  styles: [
  ]
})
export class UbigeoComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  canInsert: true;
  canUpdate: true;
  canDelete: true;

  list: Ubigeo[] = [];

  constructor(
    private modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private ubigeoService: UbigeoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  // Listener de las teclas
  @HostListener('document:keydown', ['$event'])
  // tslint:disable-next-line: typedef
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F2'){
      this.openModal(0);
    }
  }

  // Datos de la tabla
  get(): void{
    this.spinner.show();
    this.list = [];
    this.ubigeoService.getAll().subscribe(
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
        this.toastr.error('Error al obtener los datos del ubigeo', 'Atención', {timeOut: 3000, progressBar: true});
      }
    );
  }

  // Abre el modal para guardar o editar
  openModal(id: number): void{
    const modal = this.modalSerive.open(ModalUbigeoComponent, {size: 'lg'});
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
        this.ubigeoService.delete(id)
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
