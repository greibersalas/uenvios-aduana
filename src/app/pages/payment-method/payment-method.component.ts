import { Component, OnInit, ViewChild } from '@angular/core';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { PaymentMethodModel } from '../../models/payment-method.model';
import { PaymentMethodService } from '../../service/payment-method.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  // Notifications options
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: PaymentMethodModel[] = [];
  formInput: PaymentMethodModel;
  form: any;
  public isSubmit: boolean;
  public loading = true;
  public processing = false;
  canInsert: boolean;
  canUpdate: boolean;
  canDelete: boolean;

  constructor(
    private pmServices: PaymentMethodService,
    private toastr: ToastrService,
    private auth: AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initPermissions();
    this.getAllData();
    this.clear();
  }

  initPermissions(): void{
    this.route.data.subscribe(res => {
      this.auth.hasPermissionsInsert(res.permissions).subscribe( resp => {
        this.canInsert = !resp;
      });
      this.auth.hasPermissionsDelete(res.permissions).subscribe( resp => {
        this.canDelete = !resp;
      });
      this.auth.hasPermissionsUpdate(res.permissions).subscribe( resp => {
        this.canUpdate = !resp;
      });

    });
  }

  clear(): void{
    this.formInput = {
      id: 0,
      name: '',
      description: '',
      commission: 0
    };
  }

  save(form: any): void {
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      console.log(this.formInput);
      this.processing = true;
      if (this.formInput.id === 0){
        // insert new payment method
        this.pmServices.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Metodo de pago registrado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al registrar el metodo de pago', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if (this.formInput.id > 0){
        this.pmServices.update(this.formInput, this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Metodo de pago editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al editar el metodo de pago.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }
    }
  }

  getAllData(): void{
    this.loading = true;
    this.dataList = [];
    this.pmServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar los metodos de pago ', err.error);
        this.toastr.success('Atención, ocurrio un error al obtener los metodos de pago!!', 'Error!', {
          timeOut: 3000,
        });
      }
    );
  }

  setItem(item: PaymentMethodModel): void{
    this.formInput = {
      id: item.id,
      name: item.name,
      description: item.description,
      commission: item.commission
    };
  }

  delete(pm: PaymentMethodModel): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar metodo de pago ' + pm.name + '?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
        if (willDelete.value) {
          this.pmServices.delete(pm.id)
          .subscribe(
            resp => {
              Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
              this.getAllData();
            },
            () => {
              Swal.fire('Error!', 'No se puedo borrar el metodo de pago', 'error');
            }
          );
        }
    });
  }
}
