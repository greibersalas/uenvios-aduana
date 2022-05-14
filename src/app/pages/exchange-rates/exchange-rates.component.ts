import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeRateService} from '../../service/exchange-rates.service';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import { ExchangeRateModel } from 'src/app/models/exchange-rate.model';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { CoinModel } from '../../models/coin.model';
import { CoinService } from '../../service/coin.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRateComponent implements OnInit {

  //Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: ExchangeRateModel[] = [];
  formInput: ExchangeRateModel;
  coinsList: CoinModel[] = [];
  coinPrice:number;
  coinPreviousPrice:number;
  form:any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;

  constructor(
    private _exchangerateServices: ExchangeRateService,
    private toastr: ToastrService, 
    private _coinServices: CoinService,
    private auth:AuthService,
    private route: ActivatedRoute
    )
    { }

  ngOnInit(): void {
    this.initPermissions();
    this.getAllData();
    this.getCoins();
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

  setCoinLastPrice():void{
    var count = this.dataList.length
    if (count >=1)
      this.coinPrice = this.dataList[0].value
    else
    this.coinPrice = 0.00  
  }

  setCoinPreviousPrice():void{
    var count = this.dataList.length
    if (count > 1)
      this.coinPreviousPrice= this.dataList[1].value
    else
      this.coinPreviousPrice= 0.00 
  }

  getCoins(){
    this.coinsList = [];
    this._coinServices.getAll()
    .subscribe( 
      res =>{
        res.forEach((coin:CoinModel) => {
          this.coinsList.push(coin);
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
      coins: 0,
      date: new Date(),
      value: 0
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
        this._exchangerateServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Cambio insertado correctamente!!','Ok!',{
              timeOut: 5000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al registrar el cambio.','Error!',{
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._exchangerateServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Cambio editado correctamente!!','Ok!',{
              timeOut: 5000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar el cambio.','Error!',{
              timeOut: 5000,
            });
          }
        )
      }
      
    }
  }

  getAllData(){
    this.loading = true;
    this.dataList = [];
    this._exchangerateServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.setCoinLastPrice();
        this.setCoinPreviousPrice();
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar el cambio ',err.error);
        this.toastr.error('Atención, ocurrio un error al obtener los cambios de la moneda!!','Error!',{
          timeOut: 5000,
        });
      }
    )
  }

  setItem(item:any){
    
    this.formInput = {
      id: item.id,
      coins: Number(item.coins.id),
      date: item.date,
      value: 0,
      
    }
  }

  delete(exchangerate: ExchangeRateModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el cambio de la moneda?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._exchangerateServices.delete(exchangerate.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el cambio seleccionado', 'error');
            }
          );
          
        }
    });
  }

 

}
