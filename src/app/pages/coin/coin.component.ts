import { Component, OnInit, ViewChild } from '@angular/core';
import { CoinService } from '../../service/coin.service';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CoinModel } from 'src/app/models/coin.model';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: CoinModel[] = [];
  formInput: CoinModel;
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _coinServices: CoinService,
    private toastr: ToastrService,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initPermissions();
    this.getAllData();
    this.clear();
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

  clear(){
    this.formInput = {
      id: 0,
      name: '',
      description: '',
      code:''
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
        this._coinServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Moneda insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar la Moneda.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._coinServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Moneda editada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar la Moneda.', 'Error!', {
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
    this._coinServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar la moneda ',err.error);
        this.toastr.success('Atención, ocurrio un error al obtener las monedas!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  setItem(item:CoinModel){
    this.formInput = {
      id: item.id,
      name: item.name,
      description: item.description,
      code: item.code
    }
  }

  delete(coin: CoinModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar la moneda '+coin.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._coinServices.delete(coin.id)
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