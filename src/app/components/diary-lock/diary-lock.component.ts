import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

//Model
import { DiaryLockModel } from '../../models/main/diary-lock.model';
import { DoctorModel } from '../../models/doctor.model';
//Services
import { DiaryLockService } from '../../service/main/diary-lock.service';
import { DoctorService } from '../../service/doctor.service';

@Component({
  selector: 'app-diary-lock',
  templateUrl: './diary-lock.component.html',
  styleUrls: ['./diary-lock.component.scss']
})
export class DiaryLockComponent implements OnInit {

  session: any = {};
  inputs: DiaryLockModel;
  loadingSelectDoctor: boolean;
  listDoctors: DoctorModel[] = [];
  filters: any = {since: '', until: ''};
  list: DiaryLockModel[] = [];

  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService, private toastr: ToastrService,
    private _diaryLockService: DiaryLockService, private _doctorService: DoctorService,
    private store: Store<{session: any}>) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.onGetSession();
    this.onGetDoctors();
    this.filters = {
      since: moment().tz('America/Lima').format('YYYY-MM-DD'),
      until: moment().tz('America/Lima').add(15,'days').format('YYYY-MM-DD')
    }
  }

  onReset(): void{
    this.inputs = {
      iddiarylock: 0,
      doctor: '',
      campus: this.session.idcampus,
      user: this.session.id,
      date: '',
      time_since: '',
      time_until: '',
      description: ''
    }
  }

  onGetSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      if(sess.id){
        this.session = sess;
        this.onReset();
      }
    });
  }

  onGetDoctors(){
    this.loadingSelectDoctor = true;
    this.listDoctors = [];
    this._doctorService.getAll()
    .subscribe(
      res =>{
        this.listDoctors = res;
        this.loadingSelectDoctor = false;
      },
      err => {
        this.loadingSelectDoctor = false;
      }
    );
  }

  onSubmit(): void{
    this.spinner.show();
    if(this.inputs.iddiarylock === 0){
      this._diaryLockService.insert(this.inputs)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success(
            'Los datos fueron registrados correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true}
          );
          //this.activeModal.close('Save click');
          this.inputs.time_since = '';
          this.inputs.time_until = '';
          this.inputs.date = '';
          this.inputs.description = '';
          this.onGetList();
        },
        err => {
          this.spinner.hide;
          this.toastr.error(
            'Ocurrio un error al insertar los datos',
            'Atención',
            {timeOut: 3000, progressBar: true, closeButton: true}
          );
        }
      );
    }else{
      this._diaryLockService.update(this.inputs, this.inputs.iddiarylock)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success(
            'Los datos fueron editados correctamente',
            'Ok!',
            {timeOut: 3000, progressBar: true, closeButton: true}
          );
          //this.activeModal.close('Save click');
          this.inputs.iddiarylock = 0;
          this.inputs.time_since = '';
          this.inputs.time_until = '';
          this.inputs.date = '';
          this.inputs.description = '';
          this.onGetList();
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al editar los datos',
            'Atención',
            {timeOut: 3000, progressBar: true, closeButton: true}
          );
        }
      );
    }

  }

  onGetList(): void{
    this.spinner.show();
    this.list = [];
    this._diaryLockService.onGetList(this.filters.since, this.filters.until,this.inputs.doctor)
    .subscribe(
      res => {
        this.spinner.hide();
        this.list = res;
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos',
        'Atención',{ timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }

  setItem(item: DiaryLockModel): void{
    console.log("item ", item);
    this.inputs.iddiarylock = item.iddiarylock;
    this.inputs.date = item.date;
    this.inputs.time_since = item.time_since;
    this.inputs.time_until = item.time_until;
    this.inputs.description = item.description;
  }

  delete(item: DiaryLockModel){
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el registro de fecha '+item.date+'?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this.spinner.show();
        this._diaryLockService.delete(item.iddiarylock, this.session.id)
        .subscribe(
          res => {
            this.spinner.hide();
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
            this.onGetList();
          },
          err => {
            this.spinner.hide();
            Swal.fire('Error!', 'No se puedo borrar el registro', 'error');
          }
        );
      }
    });
  }

}
