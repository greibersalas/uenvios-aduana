import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { CountryModel } from '../../models/country.model';
import { CountryService } from '../../service/country.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/service/auth.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  //Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;


  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: CountryModel[] = [];
  formInput: CountryModel;
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;
  can_insert:boolean;
  can_update:boolean;
  can_delete:boolean;
  session: any = {};


  constructor(
    private _countryServices: CountryService,
    private toastr: ToastrService,
    private auth:AuthService,
    private store: Store<{session: any}>,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getSession();
    this.initPermissions();
    this.getAllData();
    this.clear();
  }

 

  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      this.session = sess
     });
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
      code: '',
      user: 2
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
        //insert new country
        this._countryServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('País insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al insertar el País.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        this._countryServices.update(this.formInput,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('País editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al editar el país.', 'Error!', {
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
    this._countryServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar el país ',err.error);
        this.toastr.success('Atención, ocurrio un error al obtener los paises!!', 'Error!', {
          timeOut: 3000,
        });
      }
    )
  }

  setItem(item:CountryModel){
    this.formInput = {
      id: item.id,
      name: item.name,
      code: item.code,
      user: 2
    }
  }

  delete(country: CountryModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el país '+country.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._countryServices.delete(country.id)
          .subscribe(
            res => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            err => {
              Swal.fire('Error!', 'No se puedo borrar el país', 'error');
            }
          );
          
        }
    });
  }

}
