import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import { TariffService } from '../../service/tariff.service';
import { TariffModel } from 'src/app/models/tariff.model';
import { TariffFormComponent } from './form/tariff-form/tariff-form.component';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit {

  dataList: TariffModel[] = [];
  formInput: TariffModel;
  public loading: boolean = true;
  public processing: boolean = false;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _tariffService: TariffService,
    private _modalSerive: NgbModal,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loading = true;
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
      this.addForm(0)
    }
  }

  addForm(id: number): void{
    const modal = this._modalSerive.open(TariffFormComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getAllData();
      }
    });
    modal.componentInstance.id = id;
  }

  getAllData(){
    this.loading = true;
    this.dataList = [];
    this._tariffService.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar la especialidad ',err.error)
      }
    )
  }

  delete(tariff: TariffModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la tarifa '+tariff.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._tariffService.delete(tariff.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar la tarifa', 'error');
            }
          );
          
        }
    });
  }

}
