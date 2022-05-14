import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { finalize, takeUntil } from "rxjs/operators";
import { handleFile } from '../../exports/lib/index';
import { Subject } from 'rxjs';

//Components
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
//Services
import { LabOrderService } from '../../service/main/lab-order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-report-lab',
  templateUrl: './report-lab.component.html',
  styleUrls: ['./report-lab.component.scss']
})
export class ReportLabComponent implements OnInit {

  protected destroyed$ = new Subject<void>();

  filters_aofEnE: any = {
    since: moment().subtract(1,'month').format('YYYY-MM-DD'),
    until: moment().format('YYYY-MM-DD')
  }
  //REPORT2
  filters2: any = {
    since: moment().subtract(1,'month').format('YYYY-MM-DD'),
    until: moment().format('YYYY-MM-DD')
  }
  //REPORT3
  filters3: any = {
    since: moment().subtract(1,'month').format('YYYY-MM-DD'),
    until: moment().format('YYYY-MM-DD')
  }
  //Chart 2
  top10: any;
  loading2: boolean = false;
  dataChart2: any;
  fecha1: string = moment().format('YYYY-MM-DD');
  //Chart 3
  productionVol: any;
  loading3: boolean = false;
  dataChart3: any;
  fechadesde3: string = moment().subtract(7,'days').format('YYYY-MM-DD');
  fechahasta3: string = moment().format('YYYY-MM-DD');
  //Chart 4
  productionIng: any;
  loading4: boolean = false;
  dataChart4: any;
  fechadesde4: string = moment().subtract(7,'days').format('YYYY-MM-DD');
  fechahasta4: string = moment().format('YYYY-MM-DD');
  //Chart 5
  loading5: boolean = false;
  data5: any;
  fecha5: string = moment().format('YYYY-MM-DD');
  //Chart 6
  loading6: boolean = false;
  data6: any;
  fecha6: string = moment().format('YYYY-MM-DD');
  constructor(
    private _labService: LabOrderService,
    private _modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getDataChart2();
    this.getDataChart3();
    this.getDataChart4();
    this.getData5();
    this.getData6();
  }

  onSubmit(): void{
    //
  }

  onPrintAofEnE(){
    this.spinner.show();
    this._labService.getAofElaboNoElaboPdf(this.filters_aofEnE).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Reporte - Pago por paciente.';
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

  onDownloadXlsxAofEnE(): void{
    this.spinner.show();
    const printName: string = `elavorados-pendientes-${moment().format('YYYYMMDDHHmmss')}`;

    this._labService.getAofElaboNoElaboXlsx(this.filters_aofEnE).pipe(
      takeUntil(this.destroyed$),
      finalize(() => this.spinner.hide())
    ).subscribe((result: Blob) => handleFile(result, printName));
  }

  onPrintAofModelState(){
    this.spinner.show();
    this._labService.getAofModelStatePdf(this.filters2).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Reporte - Modelos Según estado.';
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

  onDownloadXlsxAofModelState(): void{
    this.spinner.show();
    const printName: string = `model-state-${moment().format('YYYYMMDDHHmmss')}`;

    this._labService.getAofModelStateXlsx(this.filters2).pipe(
      takeUntil(this.destroyed$),
      finalize(() => this.spinner.hide())
    ).subscribe((result: Blob) => handleFile(result, printName));
  }

  onPrintAofRecetaDoctor(){
    this.spinner.show();
    this._labService.getAofRecetaDoctorPdf(this.filters3).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Reporte - Recetas por Odontólogo.';
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

  onDownloadXlsxAofRecetaDoctor(): void{
    this.spinner.show();
    const printName: string = `receta-doctor-${moment().format('YYYYMMDDHHmmss')}`;

    this._labService.getAofRecetaDoctorXlsx(this.filters3).pipe(
      takeUntil(this.destroyed$),
      finalize(() => this.spinner.hide())
    ).subscribe((result: Blob) => handleFile(result, printName));
  }

  getDataChart2(): void{
    this.loading2 = true;
    this.dataChart2 = false;
    const filters = {
      since: this.fecha1,
      until: this.fecha1,
      limit: 10
    }
    this._labService.getAofProduction(filters)
    .subscribe(
      res => {
        this.loading2 = false;
        if(res.length > 0){
          this.dataChart2 = {
            series: [],
            labels: []
          };
          res.map((el: any) => {
            this.dataChart2.series.push(Number(el.cantidad));
            this.dataChart2.labels.push(el.name);
          });
          this.setChart2();
        }
      },
      err => {
        this.dataChart2 = false;
        this.loading2 = false;
      }
    );
  }

  setChart2(): void{
    this.top10 = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChart2.series,
      labels: this.dataChart2.labels,
      legend: {
        show: true,
        offsetY: 50,
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        }
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#4099ff',
        }
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 320,
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
          }
        }
      }]
    }
  }

  getDataChart3(): void{
    this.loading3 = true;
    this.dataChart3 = false;
    const filters = {
      since: this.fechadesde3,
      until: this.fechahasta3,
      limit: 100
    }
    this._labService.getAofProduction(filters)
    .subscribe(
      res => {
        this.loading3 = false;
        if(res.length > 0){
          this.dataChart3 = {
            series: [],
            labels: []
          };
          res.map((el: any) => {
            this.dataChart3.series.push(Number(el.cantidad));
            this.dataChart3.labels.push(el.name);
          });
          this.setChart3();
        }
      },
      err => {
        this.dataChart3 = false;
        this.loading3 = false;
      }
    );
  }

  setChart3(): void{
    this.productionVol = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChart3.series,
      labels: this.dataChart3.labels,
      legend: {
        show: true,
        offsetY: 50,
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        }
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#4099ff',
        }
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 320,
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
          }
        }
      }]
    }
  }

  getDataChart4(): void{
    this.loading4 = true;
    this.dataChart4 = false;
    const filters = {
      since: this.fechadesde4,
      until: this.fechahasta4,
      limit: 100
    }
    this._labService.getAofProduction(filters)
    .subscribe(
      res => {
        this.loading4 = false;
        if(res.length > 0){
          this.dataChart4 = {
            series: [],
            labels: []
          };
          res.map((el: any) => {
            this.dataChart4.series.push(Number(el.valor));
            this.dataChart4.labels.push(el.name);
          });
          this.setChart4();
        }
      },
      err => {
        this.dataChart4 = false;
        this.loading4 = false;
      }
    );
  }

  setChart4(): void{
    this.productionIng = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChart4.series,
      labels: this.dataChart4.labels,
      legend: {
        show: true,
        offsetY: 50,
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        }
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#4099ff',
        }
      },
      responsive: [{
        breakpoint: 768,
        options: {
          chart: {
            height: 320,
          },
          legend: {
            position: 'bottom',
            offsetY: 0,
          }
        }
      }]
    }
  }

  getData5(): void{
    this.loading5 = true;
    this.data5 = false;
    const filters = {
      since: this.fecha5,
      until: this.fecha5
    }
    this._labService.getAofByState(filters)
    .subscribe(
      res => {
        this.loading5 = false;
        if(res.length > 0){
          this.data5 = res;
        }
      },
      err => {
        this.data5 = false;
        this.loading5 = false;
      }
    );
  }

  getData6(): void{
    this.loading6 = true;
    this.data6 = false;
    const filters = {
      since: this.fecha6,
      until: this.fecha6
    }
    this._labService.getAofByState(filters)
    .subscribe(
      res => {
        this.loading6 = false;
        if(res.length > 0){
          this.data6 = res;
        }
      },
      err => {
        this.data6 = false;
        this.loading6 = false;
      }
    );
  }
}
