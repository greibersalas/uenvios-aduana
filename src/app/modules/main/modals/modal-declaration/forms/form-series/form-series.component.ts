import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Arancel } from 'src/app/modules/files/models/arancel.model';
import { Country } from 'src/app/modules/files/models/country.model';
import { Unittype } from 'src/app/modules/files/models/unittype.model';
import { ArancelService } from 'src/app/modules/files/services/public/arancel.service';
import { CountryService } from 'src/app/modules/files/services/public/country.service';
import { UnittypeService } from 'src/app/modules/files/services/public/unittype.service';
import { Series } from 'src/app/modules/main/models/series.model';
import { DeclarationService } from 'src/app/modules/main/services/public/declaration.service';


export interface FormSeries {
    idarancel : number; 
    idpais : number;
    codigo_liberacion : string;
    fob : number; 
    fob_expenses : number;
    flete : number;
    sure : number;
    cif : number;
    kilos : number;
    quantity : number;
    units : number;
    idunittype : number;
    business_unit : number; 
    restring : number; 
    quantity_risk : number;
    preceding : string; 
    authorization : string; 
    idstatuscommodity : number;
    transport_document : string;
    name : string;
    mark : string;
    model : string;
    description : string;
    url : string;
}

@Component({
  selector: 'app-form-series',
  templateUrl: './form-series.component.html',
  styleUrls: ['./form-series.component.scss']
})
export class FormSeriesComponent implements OnInit {
  @Input() id: number;
  @Input() iddeclaration: number;
  
  formInput: FormSeries;
  countrys: Country[] = [];
  unitsType: Unittype [] = [];
  arancels : Arancel [] = [];
  status: any[] = [];
  afirmations: any[] = [];

  constructor(
    private formSerieServices: DeclarationService,
    private countryService: CountryService,
    private unittypeService: UnittypeService,
    private arancelService: ArancelService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.clear();
    this.setFormData();
  }

  loadData():void{
    this.getCountrys();
    this.getStatusCommodity();
    this.getUnitsTypes();
    this.getArancels();
    this.getAfirmation();
  }

  getArancels():void {
    this.arancelService.getAll().subscribe(data => { 
      this.arancels = data;
    });
  }

  getUnitsTypes():void{
    this.unittypeService.getAll().subscribe(data=>{
      this.unitsType = data;
    });
  }

  getCountrys():void{
    this.countryService.getAll().subscribe(data => {
      this.countrys = data
    })
  }

  getStatusCommodity():void{
    var st = {
      "idconsignee":"null",
      "description":"Estatus"
    }
    this.status.push(st);
  }

  getAfirmation():void{
    var st = [
      {
       "code":"S",
       "description":"SI"
      },
      {
       "code":"N",
       "description":"NO"
      }
    ]
    this.afirmations=st;
  }

  clear(): void{
    this.formInput = {
      idarancel : null, 
      idpais : null,
      codigo_liberacion : '',
      fob : null, 
      fob_expenses : null,
      flete : null,
      sure : null,
      cif : null,
      kilos : null,
      quantity : null,
      units : null,
      idunittype : null,
      business_unit : null, 
      restring : null, 
      quantity_risk : null,
      preceding : '', 
      authorization : '', 
      idstatuscommodity : null,
      transport_document : '',
      name : '',
      mark : '',
      model : '',
      description : '',
      url : '',
    };
  }

  setFormData(): void{
    
    if (this.iddeclaration > 0){
      console.log(this.id)
      this.formSerieServices.getOneSerieData(this.iddeclaration).subscribe(res=>{	
        this.id = res.id;
        this.formInput.idarancel = res.idarancel;
        this.formInput.idpais = res.idpais;
        this.formInput.codigo_liberacion = res.codigo_liberacion;
        this.formInput.fob = res.fob;
        this.formInput.fob_expenses = res.fob_expenses;
        this.formInput.flete = res.flete;
        this.formInput.sure = res.sure;
        this.formInput.cif = res.cif;
        this.formInput.kilos = res.kilos;
        this.formInput.quantity = res.quantity;
        this.formInput.units = res.units;
        this.formInput.idunittype = res.idunittype;
        this.formInput.business_unit = res.business_unit;
        this.formInput.restring = res.restring;
        this.formInput.quantity_risk = res.quantity_risk;
        this.formInput.preceding = res.preceding;
        this.formInput.authorization = res.authorization;
        this.formInput.idstatuscommodity = res.idstatuscommodity;
        this.formInput.transport_document = res.transport_document;
        this.formInput.name = res.name;
        this.formInput.mark = res.mark;
        this.formInput.model = res.model;
        this.formInput.description = res.description;
        this.formInput.url = res.url;
      });
      
      
    }
    
  }

  onSubmit(): void{
    this.spinner.show();
    console.log(this.formInput);
    const serie : Series = new Series();
    if (this.id === 0){
      serie.iddeclaration = this.iddeclaration;
      serie.idarancel = this.formInput.idarancel; 
      serie.idpais = this.formInput.idpais;
      serie.codigo_liberacion = this.formInput.codigo_liberacion;
      serie.fob = this.formInput.fob;
      serie.fob_expenses = this.formInput.fob_expenses;
      serie.flete = this.formInput.flete;
      serie.sure = this.formInput.sure;
      serie.cif = this.formInput.cif;
      serie.kilos = this.formInput.kilos;
      serie.quantity = this.formInput.quantity;
      serie.units = this.formInput.units;
      serie.idunittype = this.formInput.idunittype;
      serie.business_unit = this.formInput.business_unit;
      serie.restring = this.formInput.restring;
      serie.quantity_risk = this.formInput.quantity_risk;
      serie.preceding = this.formInput.preceding;
      serie.authorization = this.formInput.authorization;
      serie.idstatuscommodity = this.formInput.idstatuscommodity;
      serie.transport_document = this.formInput.transport_document;
      serie.name = this.formInput.name;
      serie.mark = this.formInput.mark;
      serie.model = this.formInput.model;
      serie.description = this.formInput.description;
      serie.url = this.formInput.url;
      

      this.formSerieServices.insertDataSerie(serie).subscribe(
        resp => {
          console.log(resp);
          this.setFormData();         
          this.spinner.hide();
          this.toastr.success(
            'Declaration registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          //this.activeModal.close('Save click');
        },
        err => {
          console.log(err);
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar la Declaración',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      console.log(this.formInput);
      serie.iddeclaration = this.iddeclaration;
      serie.idarancel = this.formInput.idarancel; 
      serie.idpais = this.formInput.idpais;
      serie.codigo_liberacion = this.formInput.codigo_liberacion;
      serie.fob = this.formInput.fob;
      serie.fob_expenses = this.formInput.fob_expenses;
      serie.flete = this.formInput.flete;
      serie.sure = this.formInput.sure;
      serie.cif = this.formInput.cif;
      serie.kilos = this.formInput.kilos;
      serie.quantity = this.formInput.quantity;
      serie.units = this.formInput.units;
      serie.idunittype = this.formInput.idunittype;
      serie.business_unit = this.formInput.business_unit;
      serie.restring = this.formInput.restring;
      serie.quantity_risk = this.formInput.quantity_risk;
      serie.preceding = this.formInput.preceding;
      serie.authorization = this.formInput.authorization;
      serie.idstatuscommodity = this.formInput.idstatuscommodity;
      serie.transport_document = this.formInput.transport_document;
      serie.name = this.formInput.name;
      serie.mark = this.formInput.mark;
      serie.model = this.formInput.model;
      serie.description = this.formInput.description;
      serie.url = this.formInput.url;
      
      this.formSerieServices.updateDataSerie(this.id,serie).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'La declaración se actualizo correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          //this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al actulizar la Declaración',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
