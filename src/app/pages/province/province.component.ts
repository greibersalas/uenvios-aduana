import { Component, OnInit, ViewChild } from '@angular/core';
import { ProvinceModule } from './province.module';
import { ProvinceService } from '../../service/province.service';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ProvinceModel } from 'src/app/models/province.model';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { DeparmentsModel } from '../../models/deparments.model';
import { DeparmentsService } from '../../service/deparments.service';



@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements OnInit {

  //Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: ProvinceModel[] = [];
  formInput: ProvinceModel;
  deparmentsList: DeparmentsModel[] = [];
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;

  constructor(
    private _provinceServices: ProvinceService,
    private toastr: ToastrService,
    private _deparmentServices: DeparmentsService
    )
    { }

  ngOnInit(): void {
    this.getAllData();
    this.getCountrys();
    this.clear();
  }

  getCountrys(){
    this.deparmentsList = [];
    this._deparmentServices.getAll()
    .subscribe(
      res =>{
        res.forEach((deparment:DeparmentsModel) => {
          this.deparmentsList.push(deparment);
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
      deparments: '',
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
        this._provinceServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Provincia insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar la provincia.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._provinceServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Provincia editada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar la provincia.', 'Error!', {
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
    this._provinceServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar la provincia ',err.error);
        this.toastr.success('Atención, ocurrio un error al obtener las provincias!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  setItem(item:any){
    this.formInput = {
      id: item.id,
      deparments: Number(item.deparments.id),
      name: item.name,
      users: Number(sessionStorage.getItem('iduser'))
    }
  }

  delete(province: ProvinceModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la provincia '+province.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._provinceServices.delete(province.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar la provincia', 'error');
            }
          );
        }
    });
  }

}
