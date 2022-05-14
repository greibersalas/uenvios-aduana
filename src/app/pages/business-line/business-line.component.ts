import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

import { BusinessLineService } from '../../service/business-line.service'
import { BusinessLineModel } from 'src/app/models/business-line.model';
import { BusinessLineFormComponent } from './form/business-line-form.component';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';


export class FormInput {
  name: string;
  description: string;
}

@Component({
  selector: 'app-business-line',
  templateUrl: './business-line.component.html',
  styleUrls: ['./business-line.component.scss']
})
export class BusinessLineComponent implements OnInit {

  //Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  dataList: BusinessLineModel[] = [];
  formInput: BusinessLineModel;
  public loading: boolean = true;
  

  constructor(
    private _blServices: BusinessLineService,
    private toastr: ToastrService,
    private _modalSerive: NgbModal,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getAllData();
    this.initPermissions();
    this.formInput = {
      id: 0,
      name: '',
      description: ''
    };   
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
      this.addForm(this.formInput)
    }
  }

  addForm(data: BusinessLineModel): void{
    const modal = this._modalSerive.open(BusinessLineFormComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getAllData();
      }
    });
    modal.componentInstance.data = data;
  }

  

  getAllData(){
    this.loading = true;
    this.dataList = [];
    this._blServices.getAll()
    .subscribe(
      res => {
        this.loading = false;
        this.dataList = res;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar la Linea de Negocio ',err.error);
        this.toastr.success('Atención, ocurrio un error al obtener las Lineas de Negocio!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  delete(bl: BusinessLineModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la linea de negocio '+bl.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._blServices.delete(bl.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar la sede', 'error');
            }
          );
          
        }
    });
  }

}
