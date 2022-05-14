import { Component, OnInit, ViewChild } from '@angular/core';
import { DeparmentsService } from '../../service/deparments.service';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import { DeparmentsModel } from 'src/app/models/deparments.model';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { CountryModel } from '../../models/country.model';
import { CountryService } from '../../service/country.service';



@Component({
  selector: 'app-deparments',
  templateUrl: './deparments.component.html',
  styleUrls: ['./deparments.component.scss']
})
export class DeparmentsComponent implements OnInit {

  //Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: DeparmentsModel[] = [];
  formInput: DeparmentsModel;
  countrysList: CountryModel[] = [];
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;

  constructor(
    private _deparmentsServices: DeparmentsService,
    private toastr: ToastrService, 
    private _countryServices: CountryService
    )
    { }

  ngOnInit(): void {
    this.getAllData();
    this.getCountrys();
    this.clear();
  }

  getCountrys(){
    this.countrysList = [];
    this._countryServices.getAll()
    .subscribe( 
      res =>{
        res.forEach((country:CountryModel) => {
          this.countrysList.push(country);
        });
      }, 
      err => {
        console.log(err.error);
      }
    );
  }

  clear(){
    this.formInput = {
      id: 0,
      countrys: 0,
      name: '',
      users: Number(sessionStorage.getItem('iduser'))
    };
  }

  save(form: any) {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      console.log(this.formInput);
      this.processing = true;
      if(this.formInput.id === 0){
        this._deparmentsServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Departamento insertado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al insertar el departamento.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._deparmentsServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Departamento editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al editar el departamento.', 'Error!', {
              timeOut: 3000,
            });
          }
        )
      }
      
    }
  }

  getAllData(){
    this.loading = true;
    this.dataList = [];
    this._deparmentsServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar el departamento ',err.error);
        this.toastr.success('Atención, ocurrio un error al obtener los departamentos!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  setItem(item:any){
    
    this.formInput = {
      id: item.id,
      countrys: Number(item.countrys.id),
      name: item.name,
      users: 10,
      
    }
  }

  delete(deparments: DeparmentsModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el departamento '+deparments.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._deparmentsServices.delete(deparments.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el departamento', 'error');
            }
          );
          
        }
    });
  }

}
