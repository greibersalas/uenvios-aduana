import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Config
import { LanguageApp } from 'src/app/config/data-table.language';
import Swal from 'sweetalert2';

// Components
import { ModalUnittypeComponent } from '../modals/modal-unittype/modal-unittype.component';

// Models
import { Unittype } from '../models/unittype.model';

// Service
import { UnittypeService } from '../services/public/unittype.service';

@Component({
  selector: 'app-unittype',
  templateUrl: './unittype.component.html',
  styleUrls: ['./unittype.component.scss']
})
export class UnittypeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  canInsert: true;
  canUpdate: true;
  canDelete: true;

  list: Unittype[] = [];

  constructor(
    private modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private UnittypeService: UnittypeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  // Datos de la tabla
  get(): void{
    this.spinner.show();
    this.list = [];
    this.UnittypeService.getAll().subscribe(
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
        console.error('Error al obtener los tipo de unidad');
        this.toastr.error('Error al obtener los datos de los tipo de unidad', 'Atención', {timeOut: 3000, progressBar: true});
      }
    );
  }

   // Abre el modal para guardar o editar
  openModal(id: number): void{
    const modal = this.modalSerive.open(ModalUnittypeComponent, {size: 'lg'});
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
        this.UnittypeService.delete(id)
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
