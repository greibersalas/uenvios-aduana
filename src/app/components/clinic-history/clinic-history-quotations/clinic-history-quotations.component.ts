import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { QuotationFormComponent } from '../../../pages/quotation/form/quotation-form.component';
import { QuotationDetailComponent } from '../../../pages/quotation/detail/quotation-detail.component';
import { FormInput } from '../../../pages/quotation/quotation.model';
import { QuotationService } from 'src/app/service/main/quotation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clinic-history-quotations',
  templateUrl: './clinic-history-quotations.component.html',
  styleUrls: ['./clinic-history-quotations.component.scss']
})
export class ClinicHistoryQuotationsComponent implements OnInit {

  @Input() id: number;
  //@Output() save = new EventEmitter<Boolean>();

  listQuotation: any[] = [];
  details: any[] = [];
  constructor(private _modalSerive: NgbModal,private _quotationService: QuotationService,
    private spinner: NgxSpinnerService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getQuotations();
  }

  addForm(id: number): void{
    const modal = this._modalSerive.open(QuotationFormComponent,{size: 'xl'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.getQuotations();
      }
    });
    modal.componentInstance.id = id;
  }

  viewDetail(data: FormInput): void{
    const modal = this._modalSerive.open(QuotationDetailComponent,{size: 'xl'});
    modal.componentInstance.data = data;
  }

  getQuotations(){
    this.spinner.show();
    this.listQuotation = [];
    this._quotationService.getByClinicHistory(this.id)
    .subscribe(
      (res: any) => {
        res.forEach((it:any) => {
          it.total_sol = 0;
          it.total_usd = 0;
          it.detail.forEach((dt: any) => {
            //console.log("dt ",dt);
            if(dt.coinId === 1){
              it.total_sol += dt.total;
            }else if(dt.coinId === 2){
              it.total_usd += dt.total;
            }
            it.businessline = dt.businessline;
          });
          it.detail = res;
          this.listQuotation.push(it);

        });
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
        console.error("Error al buscar las cotizaciones");
      }
    );
  }

}
