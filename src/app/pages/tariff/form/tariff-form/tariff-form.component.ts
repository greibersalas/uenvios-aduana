import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// Load the full build.
import * as _ from 'lodash';

import { DentalStatus } from 'src/app/models/mat/dental-status.model';
import { SpecialtyModel } from 'src/app/models/specialty.model';
import { TariffModel } from 'src/app/models/tariff.model';
import { DentalStatusService } from 'src/app/service/mat/dental-status.service';
import { SpecialtyService } from 'src/app/service/specialty.service';
import { TariffService } from 'src/app/service/tariff.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-tariff-form',
  templateUrl: './tariff-form.component.html',
  styleUrls: ['./tariff-form.component.scss']
})
export class TariffFormComponent implements OnInit {

  @Input() id: number;

  formInput: TariffModel;
  public isSubmit: boolean;
  public processing = false;

  dentalStatus: DentalStatus[] = [];
  specialtyList: SpecialtyModel[] = [];
  public validSpecialty = false;

  odontograma = false;
  laboratory = false;

  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    // tslint:disable-next-line: variable-name
    private _tariffService: TariffService,
    // tslint:disable-next-line: variable-name
    private _specialtyService: SpecialtyService,
    // tslint:disable-next-line: variable-name
    private _dentalStatusService: DentalStatusService,
    private spinner: NgxSpinnerService
  ) {
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    this.getSpecialty();
    this.setDentalStatus();
    this.clear();
    if (this.id > 0){
      this.get();
    }
  }

  clear(): void{
    this.odontograma = false;
    this.laboratory = false;
    this.formInput = {
      id: 0,
      name: '',
      description: '',
      specialty: '',
      price_sol: 0,
      cost: 0,
      price_usd: 0,
      cost_usd: 0,
      odontograma: false,
      dental_status: null,
      bracket: false,
      idkeyfacil: null
    };
  }

  get(): void{
    this.clear();
    this.spinner.show();
    this._tariffService.getOne(this.id).subscribe(
      res => {
        this.formInput = res;
        if (res.dental_status){
          this.formInput.dental_status = res.dental_status;
        }
        const specialty = res.specialty;
        this.formInput.specialty = specialty.id;
        this.odontograma = specialty.odontograma;
        this.laboratory = specialty.laboratory;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener la tarifa', 'Atención',
        {timeOut: 4000, progressBar:  true, closeButton: true});
      }
    );
  }

  setDentalStatus(): void{
    this.dentalStatus = [];
    this._dentalStatusService.getAll()
    .subscribe(
      res => {
        res.forEach( item => {
          this.dentalStatus.push(item);
        });
      },
      error => {}
    );
  }

  getSpecialty(): void{
    this.specialtyList = [];
    this._specialtyService.getAll()
    .subscribe(
      res => {
        res.forEach((sp: SpecialtyModel) => {
          this.specialtyList.push(sp);
        });
      },
      err => {
        console.log(err.error);
      }
    );
  }

  save(form: any): void{
    if (!form.valid) {
      this.isSubmit = true;
      return;
    }else{
      console.log(this.formInput);
      this.processing = true;
      if (this.formInput.id === 0){
        this._tariffService.insert(this.formInput)
        .subscribe(
          res => {
            this.processing = false;
            this.toastr.success('Tarifa insertada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.clear();
            this.activeModal.close('Save click');
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al insertar la tarifa.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }else if (this.formInput.id > 0){
        this._tariffService.update(this.formInput, this.formInput.id)
        .subscribe(
          res => {
            this.processing = false;
            this.clear();
            this.toastr.success('Tarifa editada correctamente!!', 'Ok!', {
              timeOut: 3000,
            });
            this.activeModal.close('Save click');
          },
          err => {
            this.processing = false;
            console.log(err.error);
            this.toastr.error('Atención, ha ocurrido un error al editar la tarifa.', 'Error!', {
              timeOut: 3000,
            });
          }
        );
      }
    }
  }

  validateSpecialty(): void{
    this.formInput.odontograma = false;
    this.odontograma = false;
    this.laboratory = false;
    const espe = this.specialtyList.find((el: SpecialtyModel) => el.id === Number(this.formInput.specialty));
    if (espe.odontograma){
      this.formInput.odontograma = espe.odontograma;
      this.odontograma = espe.odontograma;
    }
    if (espe.laboratory){
      this.laboratory = true;
    }
    if (this.formInput.specialty === ''){
      this.validSpecialty = false;
    }else{
      this.validSpecialty = true;
    }
  }

}
