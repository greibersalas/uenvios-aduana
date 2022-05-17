import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss']
})
export class ViewPdfComponent implements OnInit {

  @Input() title: string;
  @Input() url: string;
  @Input() origin: string;
  @Input() id: number; // Only if required
  @Input() type = 'pdf';

  constructor(
    config: NgbModalConfig,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
    private _modalSerive: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.url = `${environment.apiUrlDownload}${this.url}`;
  }

}
