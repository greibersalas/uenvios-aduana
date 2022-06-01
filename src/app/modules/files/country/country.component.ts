import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Config
import { LanguageApp } from 'src/app/config/data-table.language';
import Swal from 'sweetalert2';

// Components
import { ModalCountryComponent } from '../modals/modal-country/modal-country.component';

// Models
import { Country } from '../models/country.model';

// Service
import { CountryService } from '../services/public/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  canInsert: true;
  canUpdate: true;
  canDelete: true;

  list: Country[] = [];

  constructor(
    private modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private CountryService: CountryService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  // Datos de la tabla
  get(): void{
    this.spinner.show();
    this.list = [];
    this.CountryService.getAll().subscribe(
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
        this.toastr.error('Error al obtener los datos de los paises', 'Atención', {timeOut: 3000, progressBar: true});
      }
    );
  }

   // Abre el modal para guardar o editar
   openModal(id: number): void{
    const modal = this.modalSerive.open(ModalCountryComponent, {size: 'lg'});
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
        this.CountryService.delete(id)
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
