import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Config
import { LanguageApp } from 'src/app/config/data-table.language';
import Swal from 'sweetalert2';

// Components
import { ModalShippingTypeComponent } from '../modals/modal-shipping-type/modal-shipping-type.component';

// Models
import { ShippingType } from '../models/shipping-type.model';

// Service
import { ShippingTypeService } from '../services/public/shipping-type.service';

@Component({
  selector: 'app-shipping-type',
  templateUrl: './shipping-type.component.html',
  styleUrls: ['./shipping-type.component.scss']
})
export class ShippingTypeComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  canInsert: true;
  canUpdate: true;
  canDelete: true;

  list: ShippingType[] = [];

  constructor(
    private modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private ShippingTypeService: ShippingTypeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  // Datos de la tabla
  get(): void{
    this.spinner.show();
    this.list = [];
    this.ShippingTypeService.getAll().subscribe(
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
        this.toastr.error('Error al obtener los datos del tipo de envio', 'Atención', {timeOut: 3000, progressBar: true});
      }
    );
  }

   // Abre el modal para guardar o editar
   openModal(id: number): void{
    const modal = this.modalSerive.open(ModalShippingTypeComponent, {size: 'lg'});
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
        this.ShippingTypeService.delete(id)
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
