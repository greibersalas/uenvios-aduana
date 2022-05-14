import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from "rxjs/operators";
import { handleFile } from '../../exports/lib/index';

//Services
import { MedicalActAttentionService } from '../../service/main/medical-act-attention.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
//Components
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';
@Component({
  selector: 'app-report-quotations',
  templateUrl: './report-quotations.component.html',
  styleUrls: ['./report-quotations.component.scss']
})
export class ReportQuotationsComponent implements OnInit {

  protected destroyed$ = new Subject<void>();
  //Report 1
  filters1: any = {
    since: moment().subtract(1,'month').format('YYYY-MM-DD'),
    until: moment().format('YYYY-MM-DD')
  }
  //Chart 1
  saleSatisfaction1: any;
  loading1: boolean = false;
  dataChar1: any;
  fecha1: string = moment().format('YYYY-MM-DD');
  //Chart 2
  saleSatisfaction2: any;
  loading2: boolean = false;
  dataChar2: any;
  fecha2: string = moment().format('YYYY-MM-DD');
  //Chart 3
  saleAnnualProfit: any;
  loading3: boolean = false;
  dataChar3: any;
  fechadesde3: string = moment().subtract(30,'days').format('YYYY-MM-DD');
  fechahasta3: string = moment().format('YYYY-MM-DD');
  //Chart 4
  saleAnnualProfit2: any;
  loading4: boolean = false;
  dataChar4: any;
  fechadesde4: string = moment().subtract(30,'days').format('YYYY-MM-DD');
  fechahasta4: string = moment().format('YYYY-MM-DD');
  //Chart 5
  top5SpecialtyVol: any;
  loading5: boolean = false;
  dataChart5: any;
  fechadesde5: string = moment().subtract(30,'days').format('YYYY-MM-DD');
  fechahasta5: string = moment().format('YYYY-MM-DD');
  //Chart 6
  top5SpecialtyIng: any;
  loading6: boolean = false;
  dataChart6: any;
  fechadesde6: string = moment().subtract(30,'days').format('YYYY-MM-DD');
  fechahasta6: string = moment().format('YYYY-MM-DD');
  //Chart 7
  ttoByDoctorVol: any;
  loading7: boolean = false;
  dataChart7: any;
  fecha7: string = moment().format('YYYY-MM-DD');
  //Chart 8
  ttoByDoctorIng: any;
  loading8: boolean = false;
  dataChart8: any;
  fecha8: string = moment().format('YYYY-MM-DD');
  constructor(
    private _maaService: MedicalActAttentionService,
    private _modalSerive: NgbModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getDataChart1();
    this.getDataChart2();
    this.getDataChart3();
    this.getDataChart4();
    this.getDataChart5();
    this.getDataChart6();
    this.getDataChart7();
    this.getDataChart8();
  }

  onPrintPdfPayPatient(): void{
    this.spinner.show();
    this._maaService.getPayPatientPdf(this.filters1).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Reporte - Pagos por cliente.';
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

  onDownloadXlsxPayPatient(): void{
    this.spinner.show();
    const printName: string = `pagos-pacientes-${moment().format('YYYYMMDDHHmmss')}`;

    this._maaService.getPayPatientXlsx(this.filters1).pipe(
      takeUntil(this.destroyed$),
      finalize(() => this.spinner.hide())
    ).subscribe((result: Blob) => handleFile(result, printName));
  }

  getDataChart1(): void{
    this.loading1 = true;
    this.dataChar1 = false;
    this._maaService.getTreatmentRealized(this.fecha1,0,0,0)
    .subscribe(
      res => {
        this.loading1 = false;
        if(res.length > 0){
          this.dataChar1 = {
            series: [],
            labels: []
          };
          res.map((el:any) => {
            this.dataChar1.series.push(el.total);
            this.dataChar1.labels.push(el.tratamiento);
          });
          this.setChart1();
        }
      },
      err => {
        this.dataChar1 = false;
        this.loading1 = false;
      }
    );
  }

  getDataChart2(): void{
    this.loading2 = true;
    this.dataChar2 = false;
    this._maaService.getTreatmentRealized(this.fecha2,0,0,0)
    .subscribe(
      res => {
        this.loading2 = false;
        if(res.length > 0){
          this.dataChar2 = {
            series: [],
            labels: []
          };
          res.map((el:any) => {
            this.dataChar2.series.push(el.total);
            this.dataChar2.labels.push(el.tratamiento);
          });
          this.setChart2();
        }
      },
      err => {
        this.dataChar2 = false;
        this.loading2 = false;
      }
    );
  }

  setChart1(): void{
    this.saleSatisfaction1 = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChar1.series,//[66, 50, 40, 30,25],
      labels: this.dataChar1.labels,//['extremely Satisfied', 'Satisfied', 'Poor', 'Very Poor','IGS'],
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

  setChart2(): void{
    this.saleSatisfaction2 = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChar2.series,//[66, 50, 40, 30,25],
      labels: this.dataChar2.labels,//['extremely Satisfied', 'Satisfied', 'Poor', 'Very Poor','IGS'],
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
          color: '#667dca',
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
    this.dataChar3 = false;
    this._maaService.getTo10Tariff(this.fechadesde3,this.fechahasta3)
    .subscribe(
      res => {
        this.loading3 = false;
        if(res.length > 0){
          this.dataChar3 = {
            data: [],
            categories: []
          };
          res.map((el: any) => {
            this.dataChar3.data.push(Number(el.cantidad));
            this.dataChar3.categories.push(el.tratamiento);
          });
          this.setChart3();
        }
      },
      err => {
        this.dataChar3 = false;
        this.loading3 = false;
      }
    );
  }
  setChart3(): void{
    this.saleAnnualProfit = {
      series: [
        {
          name: "Vendidos",
          data: this.dataChar3.data
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -50
        },
        categories: this.dataChar3.categories,
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "Cantidad"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    }
  }

  getDataChart4(): void{
    this.loading4 = true;
    this.dataChar4 = false;
    this._maaService.getTo10Tariff(this.fechadesde4,this.fechahasta4)
    .subscribe(
      res => {
        this.loading4 = false;
        if(res.length > 0){
          this.dataChar4 = {
            data: [],
            categories: []
          };
          res.map((el: any) => {
            this.dataChar4.data.push(Number(el.total));
            this.dataChar4.categories.push(el.tratamiento);
          });
          this.setChart4();
        }
      },
      err => {
        this.dataChar4 = false;
        this.loading4 = false;
      }
    );
  }

  setChart4(): void{
    this.saleAnnualProfit2 = {
      series: [
        {
          name: "Vendidos",
          data: this.dataChar4.data
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1
      },

      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: this.dataChar4.categories,
        tickPlacement: "on"
      },
      yaxis: {
        title: {
          text: "Cantidad"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    }
  }

  getDataChart5(): void{
    this.loading5 = true;
    this.dataChart5 = false;
    this._maaService.getTop5Specialty(this.fechadesde5,this.fechahasta5)
    .subscribe(
      res => {
        this.loading5 = false;
        if(res.length > 0){
          this.dataChart5 = {
            series: [],
            labels: []
          };
          res.map((el: any) => {
            this.dataChart5.series.push(Number(el.cantidad));
            this.dataChart5.labels.push(el.especialidad);
          });
          this.setChart5();
        }
      },
      err => {
        this.dataChart5 = false;
        this.loading5 = false;
      }
    );
  }

  setChart5(): void{
    this.top5SpecialtyVol = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChart5.series,
      labels: this.dataChart5.labels,
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

  getDataChart6(): void{
    this.loading6 = true;
    this.dataChart6 = false;
    this._maaService.getTop5Specialty(this.fechadesde6,this.fechahasta6)
    .subscribe(
      res => {
        this.loading6 = false;
        if(res.length > 0){
          this.dataChart6 = {
            series: [],
            labels: []
          };
          res.map((el: any) => {
            this.dataChart6.series.push(Number(el.total));
            this.dataChart6.labels.push(el.especialidad);
          });
          this.setChart6();
        }
      },
      err => {
        this.dataChart6 = false;
        this.loading6 = false;
      }
    );
  }

  setChart6(): void{
    this.top5SpecialtyIng = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChart6.series,
      labels: this.dataChart6.labels,
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

  getDataChart7(): void{
    this.loading7 = true;
    this.dataChart7 = false;
    this._maaService.getTtoByDoctor(this.fecha7)
    .subscribe(
      res => {
        this.loading7 = false;
        if(res.length > 0){
          this.dataChart7 = {
            series: [],
            labels: []
          };
          res.map((el: any) => {
            this.dataChart7.series.push(Number(el.cantidad));
            this.dataChart7.labels.push(el.doctor);
          });
          this.setChart7();
        }
      },
      err => {
        this.dataChart7 = false;
        this.loading7 = false;
      }
    );
  }

  setChart7(): void{
    this.ttoByDoctorVol = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChart7.series,
      labels: this.dataChart7.labels,
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

  getDataChart8(): void{
    this.loading8 = true;
    this.dataChart8 = false;
    this._maaService.getTtoByDoctor(this.fecha8)
    .subscribe(
      res => {
        this.loading8 = false;
        if(res.length > 0){
          this.dataChart8 = {
            series: [],
            labels: []
          };
          res.map((el: any) => {
            this.dataChart8.series.push(Number(el.total));
            this.dataChart8.labels.push(el.doctor);
          });
          this.setChart8();
        }
      },
      err => {
        this.dataChart8 = false;
        this.loading8 = false;
      }
    );
  }

  setChart8(): void{
    this.ttoByDoctorIng = {
      chart: {
        height: 260,
        type: 'pie',
      },
      series: this.dataChart8.series,
      labels: this.dataChart8.labels,
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
}
