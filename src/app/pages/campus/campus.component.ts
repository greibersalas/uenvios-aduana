import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

import { CampusService } from '../../service/campus.service';
import { CampusModel } from 'src/app/models/campus.model';
import { CampusFormComponent } from './campus-form.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-campus',
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss']
})
export class CampusComponent implements OnInit {

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

  dataList: CampusModel[] = [];
  formInput: CampusModel;
  form: any;
  public loading: boolean = true;

  constructor(
    private _campusServices: CampusService,
    private toastr: ToastrService,
    private auth:AuthService,
    private route: ActivatedRoute,
    private _modalSerive: NgbModal) { }

  ngOnInit(): void {
    this.formInput = {
      id: 0,
      name: '',
      description: ''
    };
    this.initPermissions();
    this.getAllData();
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

  addForm(data: CampusModel): void{
    const modal = this._modalSerive.open(CampusFormComponent,{size: 'xl'});
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
    this._campusServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar el campus ',err.error);
        this.toastr.error('Atención, ocurrio un error al obtener las sedes!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  /* setItem(item:CampusModel){
    this.formInput = {
      id: item.id,
      name: item.name,
      description: item.description
    }
  } */

  delete(campus: CampusModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la sede '+campus.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._campusServices.delete(campus.id)
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
