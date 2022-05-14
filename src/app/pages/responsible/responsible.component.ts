import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponsibleService } from '../../service/responsible.service';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ResponsibleModel } from 'src/app/models/responsible.model';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.component.html',
  styleUrls: ['./responsible.component.scss']
})
export class ResponsibleComponent implements OnInit {

  //Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: ResponsibleModel[] = [];
  formInput: ResponsibleModel;
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;

  constructor(private _ResponsibleServices: ResponsibleService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllData();
    this.clear();
  }

  clear(){
    this.formInput = {
      id: 0,
      firt_name: '',
      last_name: '',
      cellphone: 0,
      email:'',
      adress:'',
     
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
        //insert new campus
        this._ResponsibleServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Responsable insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al insertar el reponsable.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._ResponsibleServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Responsable editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al editar el responsable.', 'Error!', {
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
    this._ResponsibleServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar el responsable ',err.error);
        this.toastr.success('Atención, ocurrio un error al obtener los reponsables!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  setItem(item:ResponsibleModel){
    this.formInput = {
      id: item.id,
      firt_name: item.firt_name,
      last_name: item.last_name,
      cellphone: item.cellphone,
      email:item.email,
      adress:item.adress,
    }
  }

  delete(responsible: ResponsibleModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el responsable '+responsible.firt_name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._ResponsibleServices.delete(responsible.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el responsable', 'error');
            }
          );
          
        }
    });
  }

}