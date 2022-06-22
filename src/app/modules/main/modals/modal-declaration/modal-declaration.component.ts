import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Declaration } from '../../models/declaration.model';
import { DeclarationService } from '../../services/public/declaration.service';

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
  selector: 'app-modal-declaration',
  templateUrl: './modal-declaration.component.html',
  styles: []
})
export class ModalDeclarationComponent implements OnInit {
 
  @Input() id: number;
  formInput: FormDeclaration;
  active = 1;

  constructor(
    private declarationService: DeclarationService,
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    
  }

  ngOnInit(): void {
    this.clear();
    this.setFormData();
  }

  

  clear(): void{
    this.formInput = {
      dispatch_date : '',
      number_packages : 0,
      idcustoms : 0,
      total_units : 0,
      idconsignee : 0,
      gross_kilos : 0,
      idshippingtype : 0,
      fob : 0,
      fob_bills : 0,
      freight : 0,
      sure : 0,
      idinsurancecarrie: 0,
      iddispatcher : 0,
      idcategories : 0,
      customer_reference : '',
      idtransportroute : 0,
      idcarrier : 0,
      iddeposit : 0,
      idimporterrisk : 0,
      idshipper : 0,
      idsender : 0,
      contents : '',
      idtechnical : null,
      idcommissionagent : null,
      electronicpayment : null,
      date_preliquidation : '',
      series_number : 0,
      type_proration : 0,
    };
  }

  setFormData(): void{
    this.declarationService.getOne(this.id).subscribe(res=>{
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
      this.formInput.idinsurancecarrie = res.idinsurancecarrie;
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
    })
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
      declaration.idinsurancecarrie = this.formInput.idinsurancecarrie;
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


      this.declarationService.insert(declaration).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'Declaration registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el Declaration',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
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
      declaration.idinsurancecarrie = this.formInput.idinsurancecarrie;
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

      this.declarationService.update(this.id,declaration).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'El pais se actualizo correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al actulizar el Pais',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
