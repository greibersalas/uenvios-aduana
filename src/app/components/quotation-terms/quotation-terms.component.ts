import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
// Load the full build.
import * as _ from 'lodash';

//Models
import { QuotationTermsModel } from '../../models/main/quotation-terms.model';
//Services
import { QuotationTermsService } from '../../service/main/quotation-terms.service';
import { TariffService } from '../../service/tariff.service';

@Component({
  selector: 'app-quotation-terms',
  templateUrl: './quotation-terms.component.html',
  styleUrls: ['./quotation-terms.component.scss']
})
export class QuotationTermsComponent implements OnInit {

  @Input() id: number;
  @Input() format: string;
  @Input() action: string;

  detail: QuotationTermsModel[] = [];
  listIncludes: QuotationTermsModel[] = [];
  listControls: QuotationTermsModel[] = [];
  listAparatos: QuotationTermsModel[] = [];
  description_i: string;
  description_c: string;
  description_a: string;
  aparato_adicional: string = '';
  control: string = '';
  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private _qtService: QuotationTermsService,
    private toastr: ToastrService,
    private tariffService: TariffService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    if(this.action === 'add'){
      this.onNotification();
      this.getTariffTerms();
      if(this.format === 'OF'){
        this.setFormatOf();
      }else{
        this.setFormatAp();
      }
    }else{
      this.get();
    }
  }

  onNotification(): void{
    Swal.fire({
      title: 'Atención',
      text: 'Antes de generar el reporte debe registrar las condiciones de la cotización',
      type: 'info'
    });
  }

  setFormatAp(): void{
    //INCLUYE
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "1 DISPOSITIVO DE AVANCE MANDIBULAR (DAM)",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 1
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "MANTENIMIENTO PERIÓDICO DE APARATO POR 2 AÑOS",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 2
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "CONTROLES QUINCENALES DURANTE 4 – 6 MESES , 2 EXAMENES DE SUEÑO SIMPLIFICADO",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 3
      }
    );
    //CONTROL
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "CONTROL",
        description: ``,
        amount: 0,
        user: sessionStorage.getItem('iduser')
      }
    );
    //CONTROLES
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "CONTROLES",
        description: `Cada 3 a 6 semanas según Indicación del especialista. En caso de daño o ruptura del aparato por mal uso o descuido, el costo por reparación es de S/.60`,
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 4
      }
    );
    //APARATO
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "ADICIONAL",
        description: `$ 100.00 dólares`,
        amount: 0,
        user: sessionStorage.getItem('iduser')
      }
    );
    this.aparato_adicional = '$ 100.00 dólares';
    //APARATOS
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "ADICIONALES",
        description: `En caso de necesitar aparatología adicional a los que ya cubre su presupuesto`,
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 5
      },{
        id: 0,
        quotation: this.id,
        type: "ADICIONALES",
        description: `En caso de pérdida del aparato con microchip, el costo Sólo del dispositivo microchip es de $90 dólares.`,
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 6
      }
    );
    this.setDetails();
  }

  setFormatOf(): void{
    //INCLUYE
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "REGISTRO FOTOGRÁFICO: FOTOS INTRAORALES Y EXTRAORALES PARA EL ANÁLISIS",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 1
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "ANÁLISIS Y PRONÓSTICO DE CRECIMIENTO SEGÚN LAS RADIOGRAFÍAS O TOMOGRAFÍAS (No Incluye Imágenes Radiográficas, ni tomográficas)",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 2
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "MODELOS DE ESTUDIO",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 3
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "MODELOS DE TRABAJO",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 4
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "REGISTROS OCLUSALES ESPECIALIZADOS",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 5
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "4 APARATOS ORTOPÉDICOS FUNCIONALES DISEÑADOS SEGÚN ESTUDIOS PREVIOS",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 6
      },{
        id: 0,
        quotation: this.id,
        type: "INCLUYE",
        description: "1 MICROCHIP (Tiempo de Duración: 1 año Aproximadamente)",
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 7
      }
    );
    //CONTROL
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "CONTROL",
        description: `S/ 100.00`,
        amount: 0,
        user: sessionStorage.getItem('iduser')
      }
    );
    this.control = 'S/ 100.00';
    //CONTROLES
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "CONTROLES",
        description: `Cada 3 a 6 semanas según Indicación del especialista. En caso de daño o ruptura del aparato por mal uso o descuido, el costo por reparación es de S/.80`,
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 8
      }
    );
    //APARATO
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "ADICIONAL",
        description: `$ 130.00 dólares`,
        amount: 0,
        user: sessionStorage.getItem('iduser')
      }
    );
    this.aparato_adicional = '$ 130.00 dólares';
    //APARATOS
    this.detail.push(
      {
        id: 0,
        quotation: this.id,
        type: "ADICIONALES",
        description: `En caso de necesitar aparatología adicional a los que ya cubre su presupuesto`,
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 9
      },{
        id: 0,
        quotation: this.id,
        type: "ADICIONALES",
        description: `En caso de pérdida del aparato con microchip, el costo Sólo del dispositivo microchip es de $100 dólares.`,
        amount: 0,
        user: sessionStorage.getItem('iduser'),
        key: 10
      }
    );

    this.setDetails();
  }

  setDetails(): void{
    this.listIncludes = this.detail.filter(dt => dt.type === 'INCLUYE');
    this.listControls = this.detail.filter(dt => dt.type === 'CONTROLES');
    this.listAparatos = this.detail.filter(dt => dt.type === 'ADICIONALES');
  }

  onSubmit(): void{
    const control = this.detail.filter(dt => dt.type === 'CONTROL');
    control[0].description = this.control;
    const adicional = this.detail.filter(dt => dt.type === 'ADICIONAL');
    adicional[0].description = this.aparato_adicional;
    this.spinner.show();
    let data = {data: this.detail};
    this._qtService.insert(data).subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success(
          'Las condiciones de la cotización fueron registrada correctamente',
          'Ok!',
          { timeOut: 3000, progressBar: true, closeButton: true}
        );
        this.activeModal.close('Save click');
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al registrar las condiciones de la cotización',
          'Atención',
          { timeOut: 3000, progressBar: true, closeButton: true}
        );
      }
    );
  }

  removeItem(index: number,it: QuotationTermsModel): void{
    //this.detail.splice(index,1);
    let key = it.key;
    _.remove(this.detail, function(it){ return it.key == key});
    if(it.type === 'INCLUYE'){
      this.listIncludes.splice(index,1);
    }else if(it.type === 'CONTROLES'){
      this.listControls.splice(index,1);
    }else if(it.type === 'ADICIONALES'){
      this.listAparatos.splice(index,1);
    }
    if(this.action === 'edit'){
      this._qtService.removeItem(it.id)
      .subscribe(res => console.log("Item remove...")
      );
    }
    this.toastr.success(
      'Item borrado',
      'Ok!',
      {timeOut: 3000, progressBar: true}
    );
    this.spinner.hide();
  }

  addItem(type: string): void{
    let description: string = '';
    if(type === 'INCLUYE'){
      description = this.description_i;
      this.description_i = '';
    }else if(type === 'CONTROLES'){
      description = this.description_c;
      this.description_c = '';
    }else if(type === 'ADICIONALES'){
      description = this.description_a;
      this.description_a = '';
    }
    this.detail.push({
      id: 0,
      quotation: this.id,
      type,
      description,
      amount: 0,
      user: sessionStorage.getItem('iduser'),
      key: Math.floor(Math.random() * 100) + 10
    });
    this.setDetails();
  }

  get(): void{
    this.spinner.show();
    this._qtService.get(this.id)
    .subscribe(
      res => {
        this.detail = res;
        this.setDetails();
        const adicional = res.filter(dt => dt.type === 'ADICIONAL');
        this.aparato_adicional = adicional[0].description;
        const control = res.filter(dt => dt.type === 'CONTROL');
        this.control = control[0].description;
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(
          'Ocurrio un error al obtener los terminos de la cotización',
          'Atención',
          { timeOut: 4000, progressBar: true, closeButton: true}
        );
      }
    );
  }

  getTariffTerms(): void{
    this.tariffService.getQuotationTermsValues()
    .subscribe(
      res => {
        const control = res.find(dt => dt.id === 58);
        if ( this.format === 'OF' && control.price_sol > 0 ) {
          this.control = `S/ ${control.price_sol}`;
        } else if ( this.format === 'OF' && control.price_usd > 0 ) {
          this.control = `$ ${control.price_usd } USD`;
        }

        const aparato = res.find(dt => dt.id === 171);
        if ( aparato.price_sol > 0 ) {
          this.aparato_adicional = `S/ ${aparato.price_sol}`;
        } else if ( aparato.price_usd > 0 ) {
          this.aparato_adicional = `$ ${aparato.price_usd } USD`;
        }
      },
      err => {
        console.log({err});
      }
    );
  }
}
