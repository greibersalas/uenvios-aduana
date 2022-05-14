import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuotationService } from 'src/app/service/main/quotation.service';

import { environment } from '../../../environments/environment';
import { QuotationTermsComponent } from '../quotation-terms/quotation-terms.component';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {

  @Input() title: string;
  @Input() url: string;
  @Input() origin: string;
  @Input() id: number;//Only if required
  @Input() type: string = 'pdf';

  constructor(
    config: NgbModalConfig,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private _modalSerive: NgbModal,
    private _quotationService: QuotationService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.url = `${environment.apiUrlDownload}${this.url}`;
  }

  onEditTerm(): void{
    this.activeModal.close();
    //Abrir el modal de los terminos
    const modal = this._modalSerive.open(QuotationTermsComponent,{size: 'xl'});
    modal.componentInstance.id = this.id;
    modal.componentInstance.format = this.origin;
    modal.componentInstance.action = 'edit';
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this._quotationService.getPdf(this.id,this.origin).subscribe(
          res => {
            const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
            modal.componentInstance.title = `Cotización Nro. ${this.id}`;
            modal.componentInstance.url = res.link;
            modal.componentInstance.origin = this.origin;
            modal.componentInstance.id = this.id;
          },
          err => {
            this.toastr.error('Ocurrio un error al obtener los datos de la orden de cotización',
            'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
          }
        );
      }
    });
  }

}
