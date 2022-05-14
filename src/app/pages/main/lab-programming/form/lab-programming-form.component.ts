import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LabProgrammingModel } from 'src/app/models/main/lab-programming.model';
import * as moment from 'moment';

import { LabProgrammingService } from 'src/app/service/main/lab-programming.service';

@Component({
  selector: 'app-lab-programming-form',
  templateUrl: './lab-programming-form.component.html',
  styleUrls: ['./lab-programming-form.component.scss']
})
export class LabProgrammingFormComponent implements OnInit {

  @Input() id: number;
  formInput: LabProgrammingModel;
  listStates: any[] = [];
  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal,
    private toastr: ToastrService,private spinner: NgxSpinnerService,
    private _lpService: LabProgrammingService) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.listStates = [
      {name: 'Nuevo'},
      {name: 'Modificación'},
      {name: 'Reparación'},
      {name: 'Colocar Chip'},
      {name: 'Nuevo Adicional'},
      {name: 'Desiste'}
    ];
    this.clear();
    if(this.id > 0){
      this.get();
    }
  }

  clear(){
    this.formInput = {
      id: 0,
      job: '',
      since: '',
      until: '',
      quantity: 0
    }
  }

  get(){
    this.spinner.show();
    this._lpService.getOne(this.id).subscribe(
      res => {
        this.formInput = res;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos','Atención',{timeOut: 3000, progressBar: true});
      }
    );
  }

  onSubmit(){
    this.spinner.show();
    if(this.formInput.id > 0){
      this._lpService.update(this.formInput,this.formInput.id)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Orden de laboratorio editada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.clear();
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Ocurrio un error al editar la orden de laboratorio!!', 'Error!', {
            timeOut: 3000,
          });
          console.error("Error al insertar ",err.error);
        }
      );
    }else{
      this._lpService.insert(this.formInput)
      .subscribe(
        res => {
          this.spinner.hide();
          this.toastr.success('Orden de laboratorio registrada correctamente!!', 'Ok!', {
            timeOut: 3000,
          });
          this.clear();
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error('Ocurrio un error al insertar la orden de laboratorio!!', 'Error!', {
            timeOut: 3000,
          });
          console.error("Error al insertar ",err.error);
        }
      );
    }    
  }

  /**
   * Valido si la fecha es menor a la fecha actual
   * @param opc 
   */
  validateDate(opc: number){
    //validamos si ya selecciono el aparato
    if(!this.formInput.job){
      this.toastr.warning('Debe seleccionar el estado del aparato','Atención',{
        timeOut: 3000,
        progressBar: true
      });
      this.formInput.since = '';
      this.formInput.until = '';
      return;
    }
    //Date since
    if(opc === 1){
      
      const today = moment().format('YYYY-MM-DD');
      const since = moment(this.formInput.since).format('YYYY-MM-DD');
      if(since < today){
        this.toastr.warning('La fecha desde debe ser mayor o igual a la fecha actual','Atención',{
          timeOut: 3000,
          progressBar: true
        });
        this.formInput.since = '';
      }else{
        if(this.formInput.job){
          this.validateDateProgramming(1);
        }
      }
    }else if(opc === 2){
      const until = moment(this.formInput.until).format('YYYY-MM-DD');
      const since = moment(this.formInput.since).format('YYYY-MM-DD');      
      if(since > until){
        this.toastr.warning('La fecha hasta debe ser mayor o igual a la fecha desde','Atención',{
          timeOut: 3000,
          progressBar: true
        });
        this.formInput.until = '';
      }else{
        if(this.formInput.job){
          this.validateDateProgramming(2);
        }
      }
    }
  }

  /**
   * Validamos si ya esta programado
   * @param opc 
   */
  validateDateProgramming(opc: number){
    const date = opc === 1 ? this.formInput.since : this.formInput.until;
    this._lpService.validateDate(date,this.formInput.job)
    .subscribe(
      res => {
        if(res){
          if(opc === 1){
            this.toastr.error('La fecha desde ya fue programada','Atención',{
              timeOut: 3000,
              progressBar: true
            });
            this.formInput.since = '';
          }else if(opc === 2){
            this.toastr.error('La fecha hasta ya fue programada','Atención',{
              timeOut: 3000,
              progressBar: true
            });
            this.formInput.until = '';
          }
        }
      },
      err => {
        this.toastr.error('Ocurrio un error al validar la fecha','Atención',{
          timeOut: 3000,
          progressBar: true
        });
      }
    );
  }

}
