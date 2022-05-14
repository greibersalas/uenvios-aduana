import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { QuotationDetailModel } from 'src/app/models/main/quotation-detail.model';
import { QuotationService } from 'src/app/service/main/quotation.service';

@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.scss']
})
export class QuotationDetailComponent implements OnInit {

  @Input() data: any;

  detail: QuotationDetailModel[] = [];
  total_sol: number = 0;
  total_usd: number = 0;

  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal,
    private _quotationService: QuotationService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(){
    this.detail = [];
    this.total_sol = 0;
    this.total_usd = 0;
    this._quotationService.getDetail(this.data.id)
    .subscribe(
      res => {
        res.forEach((detail: QuotationDetailModel) =>{
          this.detail.push(detail);
          if(detail.coin.id === 1){
            this.total_sol += detail.total;
          }else if(detail.coin.id === 2){
            this.total_usd += detail.total;
          }
        });
      },
      error => {
        console.error("Error to get detail ",error.error);
      }
    );
  }

}
