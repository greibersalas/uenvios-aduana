import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { finalize, takeUntil } from 'rxjs/operators';
import { handleFile } from '../../exports/lib/index';
import { Subject } from 'rxjs';

// Components
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';

// Models
import { DoctorModel } from 'src/app/models/doctor.model';

// Services
import { DoctorService } from 'src/app/service/doctor.service';
import { MedicalActAttentionService } from 'src/app/service/main/medical-act-attention.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-doctor',
  templateUrl: './report-doctor.component.html',
  styleUrls: ['./report-doctor.component.scss']
})
export class ReportDoctorComponent implements OnInit {

  protected destroyed$ = new Subject<void>();
  filters: any = {
    since: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    until: moment().format('YYYY-MM-DD'),
    iddoctor: ''
  };
  doctorList: DoctorModel[] = [];
  loadingDoctor = false;
  constructor(
    private doctorService: DoctorService,
    private medicalActAte: MedicalActAttentionService,
    private modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  onPrintPdfDoctorProduction(): void{
    if (this.filters.iddoctor === ''){
      this.toastr.warning('Debe seleccionar un doctor',
        'Atención', {timeOut: 4000, progressBar: true, closeButton: true});
      return;
    }
    this.spinner.show();
    this.medicalActAte.getPdfDoctorProduction(this.filters).subscribe(
      res => {
        this.spinner.hide();
        const modal = this.modalSerive.open(ViewPdfComponent, {size: 'xl'});
        modal.componentInstance.title = 'Reporte - Producción Doctor';
        modal.componentInstance.url = res.link;
        modal.componentInstance.origin = '';
        modal.componentInstance.id = null;
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos',
        'Atención', {timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }

  onDownloadXlsxDoctorProduction(): void{
    if (this.filters.iddoctor === ''){
      this.toastr.warning('Debe seleccionar un doctor',
        'Atención', {timeOut: 4000, progressBar: true, closeButton: true});
      return;
    }
    this.spinner.show();
    const printName = `produccion-doctor-${moment().format('YYYYMMDDHHmmss')}.xlsx`;

    this.medicalActAte.getXlsDoctorProduction(this.filters).pipe(
      takeUntil(this.destroyed$),
      finalize(() => this.spinner.hide())
    ).subscribe((result: Blob) => handleFile(result, printName));
  }

  getDoctors(): void{
    this.doctorList = [];
    this.doctorService.getAll()
    .subscribe(
      res => {
        this.doctorList = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }
}
