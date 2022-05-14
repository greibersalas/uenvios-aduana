import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
// Load the full build.
import * as _ from 'lodash';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';

import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';

import { DoctorService } from 'src/app/service/doctor.service';
import { LabeledStatusService } from '../../../../service/mat/labeled-status.service';
import { LabOrderService } from 'src/app/service/main/lab-order.service';
import { LabProgrammingService } from 'src/app/service/main/lab-programming.service';
import { TariffService } from 'src/app/service/tariff.service';

import { DoctorModel } from 'src/app/models/doctor.model';
import { LabeledStatusModel } from '../../../../models/mat/labeled-status.model';
import { LabOrderModel, LabOrderLabeledModel } from '../../../../models/main/labOrder.model';
import { LabOrderPendingModel } from '../../../../models/main/labOrderPending.model';


@Component({
  selector: 'app-form-lab-order',
  templateUrl: './form-lab-order.component.html',
  styleUrls: ['./form-lab-order.component.scss']
})
export class FormLabOrderComponent implements OnInit {
  editando = false;
  listPendent: LabOrderPendingModel[] = [];
  listDoctors: DoctorModel[] = [];
  listTariffs: any[] = [];
  formInput: LabOrderModel;
  // tslint:disable-next-line: variable-name
  num_document: string;
  history: string;
  patient: string;
  active = 1;
  disabled = true;
  closeModal = 'Close click';
  editorConfig: AngularEditorConfig;

  // labeled<Rotulado>
  formInputLabeled: LabOrderLabeledModel;
  listLabeled: LabOrderLabeledModel[] = [];

  listStates: any[] = [];
  listStatus: LabeledStatusModel[] = [];
  session: any = {};
  listReasons: any[] = [];

  // loading
  loadingPatient = false;
  loadingDoctor = false;
  loadingTariff = false;
  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    // tslint:disable-next-line: variable-name
    private _labOrderService: LabOrderService,
    // tslint:disable-next-line: variable-name
    private _docService: DoctorService,
    // tslint:disable-next-line: variable-name
    private _tariffService: TariffService,
    private spinner: NgxSpinnerService,
    // tslint:disable-next-line: variable-name
    private _lsService: LabeledStatusService,
    // tslint:disable-next-line: variable-name
    private _lpService: LabProgrammingService,
    private store: Store<{session: any}>,
    // tslint:disable-next-line: variable-name
    private _modalSerive: NgbModal
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
      this.editorConfig = {
        editable: true,
        spellcheck: true,
        height: '10rem',
        minHeight: '5rem',
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],
          customClasses: [
          {
            name: 'quote',
            class: 'quote',
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
          },
        ]
      };
    }

  ngOnInit(): void {
    this.getOrdenPendent();
    this.getDoctors();
    this.getBrackets();
    this.formInput = {
      id: 0,
      quotation_detail: '',
      doctor: '',
      tariff: '',
      color: '',
      date: moment().format('YYYY-MM-DD'),
      chip: false,
      assistant: '',
      job: '',
      instalation: '',
      elaboration: '',
      hour: '',
      technique: '',
      observation: '',
      superior_indications: '',
      reason: ''
    };
    this.getSession();
    this.num_document = '';
    this.history = '';
    if (this._labOrderService.id > 0){
      this.getOrderLab(this._labOrderService.id);
      this.editando = true;
    }else{
      this.editando = false;
    }
    this.setStates();
  }

  getSession(): void{
    this.store.select('session')
    .subscribe(sess => {
      if (sess.id){
        this.session = sess;
        this.formInput.assistant = sess.username;
      }
    });
  }

  setStates(): void{
    this.listStates = [];
    if (this.formInput.chip){
      this.listStates = [
        {name: 'Nuevo'},
        {name: 'Colocar Chip'}
      ];
    }else{
      this.listStates = [
        {name: 'Nuevo'},
        {name: 'Modificación'},
        {name: 'Reparación'},
        {name: 'Colocar Chip'},
        {name: 'Nuevo Adicional'},
        {name: 'Desiste'}
      ];
    }
  }

  setReasons(): void{
    this.listReasons = [];
    if (this.formInput.job === 'Nuevo'){
      this.listReasons = [
        {name: 'Tiempo paciente'},
        {name: 'Agenda'},
        {name: 'Laboratorio'}
      ];
    }else if (this.formInput.job === 'Reparación' || this.formInput.job === 'Modificación'){
      this.listReasons = [
        {name: 'Acrílico'},
        {name: 'Alambre'},
        {name: 'Tornillo'}
      ];
    }
  }

  getOrderLab(id: number): void{
    this.spinner.show();
    this._labOrderService.getOne(id).subscribe(
      res => {
        this.spinner.hide();
        this.formInput = res;
        this.formInput.quotation_detail = res.quotation_detail.id;
        this.setPatient();
        this.formInput.doctor = res.doctor.id;
        this.formInput.tariff = res.tariff.id;
        this.formInput.hour = res.hour;
        this.formInput.elaboration = res.elaboration;
        this.disabled = false;
        this.setReasons();
      },
      err => {
        this.spinner.hide();
        // console.error('Error al buscar la orden de lab');
      }
    );
  }

  getOrdenPendent(): void{
    this.listPendent = [];
    this.loadingPatient = true;
    this._labOrderService.getPendient()
    .subscribe(
      res => {
        res.forEach((i: LabOrderPendingModel) => {
          if (this._labOrderService.id > 0){
            this.listPendent.push(i);
          }else{
            this.listPendent.push(i);
            if (i.state === 1 || i.state === 2){
            }
          }
        });
        this.loadingPatient = false;
      },
      err => {
        // console.log('Error al cargar las ordes pendientes');
      }
    );
  }

  getDoctors(): void{
    this.listDoctors = [];
    this.loadingDoctor = true;
    this._docService.getAll()
    .subscribe(
      res => {
        this.listDoctors = res;
        this.loadingDoctor = false;
      },
      err => {
        this.loadingDoctor = false;
        // console.error('Error al buscar los doctores');
      }
    );
  }

  getBrackets(): void{
    this.listTariffs = [];
    this.loadingTariff = true;
    this._tariffService.getLabs()
    .subscribe(
      res => {
        this.loadingTariff = false;
        this.listTariffs = res;
      },
      err => {
        this.loadingTariff = false;
        console.error('Error al obtener los aparatos');
      }
    );
  }

  setPatient(): void{
    const id = Number(this.formInput.quotation_detail);
    const patient = _.find(this.listPendent, {id});
    const ch = patient.quotation.clinicHistory;
    this.num_document = ch.documentNumber;
    this.history = ch.history;
    this.patient = `${ch.name} ${ch.lastNameFather} ${ch.lastNameMother}`;
  }

  /**
   * validamos si la fecha de entrega tiene
   * fecha programada
   */
  validateDateElaboration(): void{
    if (!moment(this.formInput.elaboration).isBefore(this.formInput.instalation)){
      this.toastr.warning('La fecha de elaboración debe ser anterior a la fecha de instalación', 'Atención', {
        timeOut: 4000,
        progressBar: true
      });
      this.formInput.elaboration = '';
      return;
    }
    // validamos que la fecha de instalación no sea un domingo
    if ( moment(this.formInput.elaboration).day() === 0){
      this.toastr.warning('la fecha de elaboracion no puede ser un domingo', 'Atención', {
        timeOut: 4000,
        progressBar: true
      });
      this.formInput.elaboration = '';
      return;
    }
    this._lpService.validateDate(this.formInput.elaboration, this.formInput.job)
    .subscribe(
      res => {
        if (!res){
          this.toastr.error('La fecha no tiene programación, contactar con el área responsable', 'Atención', {
            timeOut: 5000,
            progressBar: true
          });
          this.formInput.elaboration = '';
        }else{
          // Validamos la disponibilidad
          this.getavailability(this.formInput.elaboration);
        }
      },
      err => {
        this.toastr.error('Ocurrio un error al validar la fecha', 'Atención', {
          timeOut: 3000,
          progressBar: true
        });
      }
    );
   }

   /**
    * validamos el formato de hora
    * fecha programada
    */
  isValidHour(e): void{
    // tslint:disable-next-line: variable-name
    const hour_val = this.formInput.hour.split(':');
    if (hour_val.length < 3){
      this.toastr.warning('Formato de hora invalido', 'Atención', {
        timeOut: 4000,
        progressBar: true
      });
      this.formInput.hour = '';
      return;
    }
    if (Number(hour_val[0]) > 24 || Number(hour_val[0]) < 0 ||
        Number(hour_val[1]) > 60 || Number(hour_val[1]) < 0 ||
        Number(hour_val[2]) > 60 || Number(hour_val[2]) < 0
    ){
      this.toastr.warning('Formato de hora invalido', 'Atención', {
        timeOut: 4000,
        progressBar: true
      });
      this.formInput.hour = '';
      return;
    }
    if (this.formInput.hour.length !== 8){
      this.toastr.warning('Formato de hora invalido', 'Atención', {
        timeOut: 4000,
        progressBar: true
      });
      this.formInput.hour = '';
      return;
    }
  }

  /**
   * validamos si la fecha de entrega tiene
   * fecha programada
   */
  validateDateprogramming(): void{
    // validamos si ya selecciono el aparato
    if (!this.formInput.job){
      this.toastr.warning('Debe seleccionar el estado del aparato', 'Atención', {
        timeOut: 4000,
        progressBar: true
      });
      this.formInput.instalation = '';
      return;
    }
    // validamos que la fecha de instalación no sea un domingo
    if (moment(this.formInput.instalation).day() === 0){
      this.toastr.warning('El día de instalación no puede ser un domingo', 'Atención', {
        timeOut: 4000,
        progressBar: true
      });
      this.formInput.instalation = '';
      return;
    }
    // Restamos un día al aparato
    let date = moment(this.formInput.instalation).subtract(1, 'days').format('YYYY-MM-DD');
    // Valido si el día anterior es Domingo
    if (moment(date).day() === 0){
      date = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    }
    this.formInput.elaboration = date;
    this._lpService.validateDate(date, this.formInput.job)
    .subscribe(
      res => {
        if (!res){
          this.toastr.error('La fecha no tiene programación, contactar con el área responsable', 'Atención', {
            timeOut: 5000,
            progressBar: true
          });
          this.formInput.instalation = '';
        }else{
          // Validamos la disponibilidad
          this.getavailability(date);
        }
      },
      err => {
        this.toastr.error('Ocurrio un error al validar la fecha', 'Atención', {
          timeOut: 3000,
          progressBar: true
        });
      }
    );
  }

  getavailability(date: string): void{
    this.spinner.show();
    // Busco la cantidad de cupos
    this._lpService.getByJob(date, this.formInput.job)
    .subscribe(
      res => {
        // Busco la cantidad de reservas
        this._labOrderService.getCant(date, this.formInput.job).subscribe(
          res2 => {
            this.spinner.hide();
            // Si no hay cupos disponibles informamso al usuairo
            console.log('Cantidad ', res2, ' cantidad permitida ', res.quantity);
            if (res2 >= res.quantity){
              this.toastr.warning('No hay cupos disponibles para la fecha selecionada', 'Atención', {
                timeOut: 3000,
                progressBar: true
              });
              this.formInput.instalation = '';
            }
          },
          err => {
            this.spinner.hide();
            this.toastr.error('Error al obtener la cantidad programada', 'Atención', {
              timeOut: 3000,
              progressBar: true
            });
          }
        );
      },
      err => {
        console.error('error al obtener la programación');
      }
    );
  }

  onSubmit(): void{
    this.spinner.show();
    if (this.formInput.id > 0){
      this._labOrderService.update(this.formInput, this.formInput.id)
      .subscribe(
        res => {
          this.closeModal = 'Save click';
          this.spinner.hide();
          this.toastr.success('Orden de laboratorio editada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.getOrderLab(res.id);
          this.disabled = false;
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Ocurrio un error al editar la orden de laboratorio!!', 'Error!', {
            timeOut: 3000,
          });
          console.error('Error al insertar ', err.error);
        }
      );
    }else{
      this._labOrderService.insert(this.formInput)
      .subscribe(
        res => {
          this.closeModal = 'Save click';
          this.spinner.hide();
          this.toastr.success('Orden de laboratorio registrada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.getOrderLab(res.id);
          this.disabled = false;
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Ocurrio un error al insertar la orden de laboratorio!!', 'Error!', {
            timeOut: 3000,
          });
          console.error('Error al insertar ', err.error);
        }
      );
    }
  }

  setDataLabeled(): void{
    // Labeled
    this.formInputLabeled = {
      date: '',
      status: '',
      laborder: this.formInput.id
    };
    this.getLabeledStatus();
  }

  getLabeledStatus(): void{
    this.listStatus = [];
    this._lsService.getAll().subscribe(
      res => {
        this.listStatus = res;
      },
      err => {
        console.error('Error al obtener los status');
      }
    );
  }

  onSubmitLabeled(): void{
    this.spinner.show();
    // Update
    if (this.formInputLabeled.id > 0){
      this._labOrderService.updateLabeled(this.formInputLabeled, this.formInputLabeled.id)
      .subscribe(
        res => {
          this.formInputLabeled = res;
          this.spinner.hide();
          this.toastr.success('Rotulado editado correctamente', 'Ok!', {timeOut: 3000, progressBar: true});
          this.setDataLabeled();
          this.getListLabeled();
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Ocurrio un error al actualizar el rotulado', 'Error', {timeOut: 3000, progressBar: true});
        }
      );
    // insert
    }else{
      this._labOrderService.insertLabeled(this.formInputLabeled)
      .subscribe(
        res => {
          this.formInputLabeled = res;
          this.spinner.hide();
          this.toastr.success('Rotulado guardado correctamente', 'Ok!', {timeOut: 3000, progressBar: true});
          this.setDataLabeled();
          this.getListLabeled();
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Ocurrio un error al insertar el rotulado', 'Error', {timeOut: 3000, progressBar: true});
        }
      );
    }
  }

  getListLabeled(): void{
    this.listLabeled = [];
    this._labOrderService.getListLabeled(this.formInput.id)
    .subscribe(
      res => {
        if (res.length > 0){
          this.listLabeled = res;
        }
      },
      err => {
        console.error('Error al obtener la lista de rotulados');
      }
    );
  }

  setInpusLabeled(item: LabOrderLabeledModel): void{
    this.formInputLabeled = item;
    this.formInputLabeled.status = item.status.id;
  }

  deleteLabeled(item: LabOrderLabeledModel): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: '¿Está seguro que desea eliminar el rotulado de fecha ' + item.date + '?',
      type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.value) {
        this._labOrderService.deleteLabeled(item.id)
        .subscribe(
          res => {
            Swal.fire('ok!', 'Registro eliminado satisfactoriamente', 'success');
            this.getListLabeled();
          },
          err => {
            Swal.fire('Error!', 'No se puedo borrar el rotulado', 'error');
          }
        );
      }
    });
  }

  onPrint(id: number): void{
    this.spinner.show();
    this._labOrderService.getPdf(id).subscribe(
      res => {
        this.spinner.hide();
        console.log(res);
        const modal = this._modalSerive.open(ViewPdfComponent, {size: 'xl'});
        modal.componentInstance.title = 'Rotulado Laboratorio';
        modal.componentInstance.url = res.link;
      },
      err => {
        console.log(err);
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos de la orden de laboratorio',
        'Atención', {timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }
}
