import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Carrier } from 'src/app/modules/files/models/carrier.model';
import { Categories } from 'src/app/modules/files/models/categories.model';
import { Customs } from 'src/app/modules/files/models/customs.model';
import { Deposit } from 'src/app/modules/files/models/deposit.model';
import { ImporterRisk } from 'src/app/modules/files/models/importer-risk.model';
import { Sender } from 'src/app/modules/files/models/sender.model';
import { Shipper } from 'src/app/modules/files/models/shipper.model';
import { ShippingType } from 'src/app/modules/files/models/shipping-type.model';
import { TransportRoute } from 'src/app/modules/files/models/transport-route';
import { CarrierService } from 'src/app/modules/files/services/public/carrier.service';
import { CategoriesService } from 'src/app/modules/files/services/public/categories.service';
import { CustomsService } from 'src/app/modules/files/services/public/customs.service';
import { DepositService } from 'src/app/modules/files/services/public/deposit.service';
import { ImporterRiskService } from 'src/app/modules/files/services/public/importer-risk.service';
import { SenderService } from 'src/app/modules/files/services/public/sender.service';
import { ShipperService } from 'src/app/modules/files/services/public/shipper.service';
import { ShippingTypeService } from 'src/app/modules/files/services/public/shipping-type.service';
import { TransportRouteService } from 'src/app/modules/files/services/public/transport-route.service';


// Model
import { Declaration } from '../../../../models/declaration.model';
import { DeclarationService } from '../../../../services/public/declaration.service';

export interface FormDeclaration {
  dispatch_date : string;
  number_packages : number;
  idcustoms : number;
  total_units : number;
  idconsignee : number;
  gross_kilos : number;
  idshippingtype : number;
  fob : number;
  fob_bills : number;
  freight : number;
  sure : number;
  idinsurancecarrie: number;
  iddispatcher : number;
  idcategories : number;
  customer_reference : string;
  idtransportroute : number;
  idcarrier : number;
  iddeposit : number;
  idimporterrisk : number;
  idshipper : number;
  idsender : number;
  contents : string;
  idtechnical : null;
  idcommissionagent : null;
  electronicpayment : null;
  date_preliquidation : string;
  series_number : number;
  type_proration : number;
}


@Component({
  selector: 'app-form-general',
  templateUrl: './form-general.component.html',
  styleUrls: ['./form-general.component.scss']
})
export class FormGeneralComponent implements OnInit {

  @Input() id: number;
  @Output() IdChangeValue = new EventEmitter<number>();
  
  formInput: FormDeclaration;
  customs : Customs [] = []
  shippingTypes : ShippingType []= [];
  categories : Categories[] = [];
  carries : Carrier [] = [];
  transportRoutes : TransportRoute[] = [];
  importerRisks : ImporterRisk [] = [];
  deposits : Deposit[] = [];
  senders : Sender [] = [];
  shippers : Shipper[] = [];
  consigners : any [] = [];



  constructor(
    private declarationService: DeclarationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private customServices: CustomsService,
    private shippingTypesService: ShippingTypeService,
    private categoriesService: CategoriesService,
    private carrierService: CarrierService,
    private transportRoutesServices: TransportRouteService,
    private importerRiksServices : ImporterRiskService,
    private depositService: DepositService,
    private senderService: SenderService,
    private ShipperService: ShipperService
  ) { }

  ngOnInit(): void {
    this.LoadData();
    this.clear();
    this.setFormData();
  }

  changeId(id: number): void {
    this.IdChangeValue.emit(id);
  }

  LoadData(): void{
    this.getAduanas();
    this.getShippeingTypes();
    this.getCategorias();
    this.getCarries();
    this.getTransportRoutes();
    this.getImporterRisk();
    this.getDeposits();
    this.getSenders();
    this.getShipper();
    this.getConsigners();
  }

  onChangeAduana($event:any): void {
    console.log($event.target.value,this.formInput.idcustoms);
  }

  getConsigners(): void {
    var consigner = {
      "idconsignee":"83679",
      "description":"CONSIGNATARIO"
    }
    this.consigners.push(consigner);
  }

  getShipper(): void{
    this.ShipperService.getAll().subscribe(data=>{
      this.shippers = data;
    });
  }

  getSenders():void {
    this.senderService.getAll().subscribe(data=>{
      this.senders = data;
    });
  }

  getDeposits(): void {
    this.depositService.getAll().subscribe(data=>{
      this.deposits = data;
    });
  }

  getImporterRisk():void {
    this.importerRiksServices.getAll().subscribe(data=>{
      this.importerRisks = data;
    })
  }

  getTransportRoutes(): void {
    this.transportRoutesServices.getAll().subscribe(data=>{
      this.transportRoutes = data;
    });
  }

  getCarries(): void {
    this.carrierService.getAll().subscribe(data=>{
      this.carries = data;
    })
  }

  getShippeingTypes(): void{
    this.shippingTypesService.getAll().subscribe(data=>{
      this.shippingTypes = data;
    })
  }

  getAduanas(): void{
    this.customServices.getAll().subscribe(data=>{
      this.customs = data;
    })
  }

  getCategorias(): void{
    this.categoriesService.getAll().subscribe(data=>{
      this.categories = data;
    })
  }

  clear(): void{
    this.formInput = {
      dispatch_date : '',
      number_packages : null,
      idcustoms : null,
      total_units : null,
      idconsignee : null,
      gross_kilos : null,
      idshippingtype : null,
      fob : null,
      fob_bills : null,
      freight : null,
      sure : null,
      idinsurancecarrie: null,
      iddispatcher : null,
      idcategories : null,
      customer_reference : '',
      idtransportroute : null,
      idcarrier : null,
      iddeposit : null,
      idimporterrisk : null,
      idshipper : null,
      idsender : null,
      contents : '',
      idtechnical : null,
      idcommissionagent : null,
      electronicpayment : null,
      date_preliquidation : '',
      series_number : null,
      type_proration : null,
    };
  }

  setFormData(): void{
    if (this.id > 0){
      this.declarationService.getOneGeneralData(this.id).subscribe(res=>{
        this.formInput.dispatch_date = res.dispatch_date;
        this.formInput.idcustoms = res.idcustoms;
        this.formInput.total_units = res.total_units;
        this.formInput.idconsignee = res.idconsignee;
        this.formInput.gross_kilos = res.gross_kilos;
        this.formInput.idshippingtype = res.idshippingtype;
        this.formInput.fob = res.fob;
        this.formInput.fob_bills = res.fob_bills;
        this.formInput.freight = res.freight;
        this.formInput.sure = res.sure;
        this.formInput.idinsurancecarrie = res.idinsurancecarrier;
        this.formInput.iddispatcher = res.iddispatcher;
        this.formInput.idcategories = res.idcategories;
        this.formInput.customer_reference = res.customer_reference;
        this.formInput.idtransportroute = res.idtransportroute;
        this.formInput.idcarrier = res.idcarrier;
        this.formInput.iddeposit = res.iddeposit;
        this.formInput.idimporterrisk = res.idimporterrisk;
        this.formInput.idshipper = res.idshipper;
        this.formInput.idsender = res.idsender;
        this.formInput.contents = res.contents;
        this.formInput.idtechnical = res.idtechnical;
        this.formInput.electronicpayment = res.electronicpayment;
        this.formInput.date_preliquidation = res.date_preliquidation;
        this.formInput.series_number = res.series_number;
        this.formInput.type_proration = res.type_proration; 
        this.formInput.number_packages = res.number_packages;
        
      })
    }
    
  }

  onSubmit(): void{
    this.spinner.show();
    const declaration: Declaration = new Declaration();
    if (this.id === 0){
      declaration.id = 0;
      declaration.dispatch_date = this.formInput.dispatch_date;
      declaration.idcustoms = this.formInput.idcustoms;
      declaration.total_units = this.formInput.total_units;
      declaration.idconsignee = this.formInput.idconsignee;
      declaration.gross_kilos = this.formInput.gross_kilos;
      declaration.idshippingtype = this.formInput.idshippingtype;
      declaration.fob = this.formInput.fob;
      declaration.fob_bills = this.formInput.fob_bills;
      declaration.freight = this.formInput.freight;
      declaration.sure = this.formInput.sure;
      declaration.idinsurancecarrier = this.formInput.idinsurancecarrie;
      declaration.iddispatcher = this.formInput.iddispatcher;
      declaration.idcategories = this.formInput.idcategories;
      declaration.customer_reference = this.formInput.customer_reference;
      declaration.idtransportroute = this.formInput.idtransportroute;
      declaration.idcarrier = this.formInput.idcarrier;
      declaration.iddeposit = this.formInput.iddeposit;
      declaration.idimporterrisk = this.formInput.idimporterrisk;
      declaration.idshipper = this.formInput.idshipper;
      declaration.idsender = this.formInput.idsender;
      declaration.contents = this.formInput.contents;
      declaration.idtechnical = this.formInput.idtechnical;
      declaration.electronicpayment = this.formInput.electronicpayment;
      declaration.date_preliquidation = this.formInput.date_preliquidation;
      declaration.series_number = this.formInput.series_number;
      declaration.type_proration = this.formInput.type_proration;
      declaration.number_packages = this.formInput.number_packages;
      declaration.idcommissionagent = this.formInput.idcommissionagent;

      this.declarationService.insertDataGeneral(declaration).subscribe(
        resp => {
          console.log(resp);
          this.id = resp.id;
          this.changeId(resp.id);
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
            'Ocurrio un error al registrar el Declaración',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      console.log(this.formInput);
      declaration.id = this.id;
      declaration.dispatch_date = this.formInput.dispatch_date;
      declaration.idcustoms = this.formInput.idcustoms;
      declaration.total_units = this.formInput.total_units;
      declaration.idconsignee = this.formInput.idconsignee;
      declaration.gross_kilos = this.formInput.gross_kilos;
      declaration.idshippingtype = this.formInput.idshippingtype;
      declaration.fob = this.formInput.fob;
      declaration.fob_bills = this.formInput.fob_bills;
      declaration.freight = this.formInput.freight;
      declaration.sure = this.formInput.sure;
      declaration.idinsurancecarrier = this.formInput.idinsurancecarrie;
      declaration.iddispatcher = this.formInput.iddispatcher;
      declaration.idcategories = this.formInput.idcategories;
      declaration.customer_reference = this.formInput.customer_reference;
      declaration.idtransportroute = this.formInput.idtransportroute;
      declaration.idcarrier = this.formInput.idcarrier;
      declaration.iddeposit = this.formInput.iddeposit;
      declaration.idimporterrisk = this.formInput.idimporterrisk;
      declaration.idshipper = this.formInput.idshipper;
      declaration.idsender = this.formInput.idsender;
      declaration.contents = this.formInput.contents;
      declaration.idtechnical = this.formInput.idtechnical;
      declaration.electronicpayment = this.formInput.electronicpayment;
      declaration.date_preliquidation = this.formInput.date_preliquidation;
      declaration.series_number = this.formInput.series_number;
      declaration.type_proration = this.formInput.type_proration;
      declaration.number_packages = this.formInput.number_packages;
      declaration.idcommissionagent = this.formInput.idcommissionagent;
      
      this.declarationService.updateDataGeneral(this.id,declaration).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'El pais se actualizo correctamente',
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
