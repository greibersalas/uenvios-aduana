import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { UiModalComponent } from 'src/app/theme/shared/components/modal/ui-modal/ui-modal.component';
import { DocumentsModel } from '../../models/documents.model'
import { DocumentsService } from '../../service/documents.service'
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';

export class FormInput {
  id: number;
  name: string;
  description: string;
  length: number;
  correlative: number;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

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

  @ViewChild('modalForm') modal: UiModalComponent;

  dataList: DocumentsModel[] = [];
  formInput: FormInput;
  form: any;
  public isSubmit: boolean;
  public loading: boolean = true;
  public processing: boolean = false;

  constructor(
    private _documentServices: DocumentsService,
    private toastr: ToastrService,
    private auth:AuthService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loading = true;
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
      length: 0,
      correlative: 0
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
        //insert new document
        let data: DocumentsModel = {
          id: 0,
          name: this.formInput.name,
          description: this.formInput.description,
          length: this.formInput.length,
          correlative: this.formInput.correlative
        }
        this._documentServices.insert(data)
        .subscribe(
          res => {
            this.processing = false;
            this.modal.hide();
            this.toastr.success('Documento registrado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.getAllData();
          },
          err =>{
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al registrar el documento.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if(this.formInput.id > 0){
        let data: DocumentsModel = {
          id: this.formInput.id,
          name: this.formInput.name,
          description: this.formInput.description,
          length: this.formInput.length,
          correlative: this.formInput.correlative
        }
        this._documentServices.update(data,this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.getAllData();
            this.modal.hide();
            this.toastr.success('Documento editado correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.success('Atención, ha ocurrido un error al editar el documento.', 'Error!', {
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
    this._documentServices.getAll()
    .subscribe(
      res => {
        this.dataList = res;
        this.loading = false;
      },
      err => {
        this.loading = false;
        console.error('Error al buscar los documentos ',err.error)
      }
    )
  }

  setItem(item:DocumentsModel){
    //console.log(item);
    this.formInput = {
      id: item.id,
      name: item.name,
      description: item.description,
      length: item.length,
      correlative: item.correlative
    }
  }

  delete(document: FormInput){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el documento '+document.name+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      console.log(willDelete);
        if (willDelete.value) {
          this._documentServices.delete(document.id)
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
