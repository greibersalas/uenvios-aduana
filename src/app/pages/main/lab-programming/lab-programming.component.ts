import { Component, HostListener, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { LabProgrammingService } from '../../../service/main/lab-programming.service';
import { LabProgrammingModel } from '../../../models/main/lab-programming.model';
import { LabProgrammingFormComponent } from './form/lab-programming-form.component';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lab-programming',
  templateUrl: './lab-programming.component.html',
  styleUrls: ['./lab-programming.component.scss']
})
export class LabProgrammingComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  list: LabProgrammingModel[] = [];
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _lpService: LabProgrammingService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _modalSerive: NgbModal,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initPermissions();
    this.get();
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
      this.addForm(0);
    }
  }

  get(){
    this.spinner.show();
    this.list = [];
    this._lpService.getAll().subscribe(
      res => {
        this.list = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        console.error("Error al obtener la programación");
        this.toastr.error('Error al obtener la programación','Atención',{timeOut: 3000, progressBar: true});
      }
    );
  }

  addForm(id: number){
    const modal = this._modalSerive.open(LabProgrammingFormComponent);
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.get();
      }
    });
    modal.componentInstance.id = id;
  }

  delete(id: number){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la programación?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.value) {
          this._lpService.delete(id)
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
