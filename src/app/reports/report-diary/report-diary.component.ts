import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from "rxjs/operators";
import { handleFile } from '../../exports/lib/index';

//Models
import { EnvironmentDoctorModel } from "../../models/environment-doctor.model";
//Services
import { EnvironmentDoctorService } from 'src/app/service/environment-doctor.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReservationService } from '../../service/main/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Components
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';

@Component({
  selector: 'app-report-diary',
  templateUrl: './report-diary.component.html',
  styleUrls: ['./report-diary.component.scss']
})
export class ReportDiaryComponent implements OnInit {
  listEnviroments : EnvironmentDoctorModel[] = []
  listDayResumen : any[]=[]

  //Chart 1
  loading1: boolean = false;
  dataChar1: any;
  fechadesde1: string = moment().subtract(30,'days').format('YYYY-MM-DD');
  fechahasta1: string = moment().format('YYYY-MM-DD');
  //Chart 2
  loading2: boolean = false;
  dataChar2: any;
  fechadesde2: string = moment().subtract(30,'days').format('YYYY-MM-DD');
  fechahasta2: string = moment().format('YYYY-MM-DD');
  protected destroyed$ = new Subject<void>();
  //Report 1
  filters1: any = {
    since: moment().subtract(1,'month').format('YYYY-MM-DD'),
    until: moment().format('YYYY-MM-DD')
  }
  constructor(
    private _enviroment: EnvironmentDoctorService,
    private _reservationService: ReservationService,
    private _modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
   ) { }

  ngOnInit(): void {
    this.onGetDataChart1();
    this.onGetDataChart2();
    this.getEnvironments()
  }

  getEnvironments(){
    this._enviroment.getByCampus().subscribe((data)=>{
      this.listEnviroments = data
    })
  }

  onGetDataChart1(): void{
    this.loading1 = true;
    this.dataChar1 = {};
    const filters = {
      since: this.fechadesde1,
      until: this.fechahasta1
    }
    this._reservationService.getCantReservations(filters)
    .subscribe(
      res => {
        this.loading1 = false;
        this.dataChar1 = res;
      },
      err => {
        this.loading1 = false;
      }
    );
  }

  onGetDataChart2(): void{
    this.loading2 = true;
    this.dataChar2 = {};
    const filters = {
      since: this.fechadesde2,
      until: this.fechahasta2
    }
    this._reservationService.getCantCanceRepro(filters)
    .subscribe(
      res => {
        this.loading2 = false;
        this.dataChar2 = res;
      },
      err => {
        this.loading2 = false;
      }
    );
  }

  onPrintPdfDatesPatient(){
    this.spinner.show();
    this._reservationService.getDatesPatientPdf(this.filters1).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Reporte - Citas por Paciente.';
        modal.componentInstance.url = res.link;
        modal.componentInstance.origin = '';
        modal.componentInstance.id = null;
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocurrio un error al obtener los datos',
        'Atención',{timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }

  onDownloadXlsxDatesPatient(): void{
    this.spinner.show();
    const printName: string = `citas-pacientes-${moment().format('YYYYMMDDHHmmss')}`;

    this._reservationService.getDatesPAtientXlsx(this.filters1).pipe(
      takeUntil(this.destroyed$),
      finalize(() => this.spinner.hide())
    ).subscribe((result: Blob) => handleFile(result, printName));
  }

}
