import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';
//Services
import { ClinicHistoryService } from '../../service/clinic-history.service';
import { DateService } from '../../service/helpers/date.service';
import { ReservationService } from '../../service/main/reservation.service';
import { ViewPdfComponent } from 'src/app/components/view-pdf/view-pdf.component';

@Component({
  selector: 'app-report-clinic-history',
  templateUrl: './report-clinic-history.component.html',
  styleUrls: ['./report-clinic-history.component.scss']
})
export class ReportClinicHistoryComponent implements OnInit {

  public chartDB: any;
  public chartDBNewpatiens: any;
  public chartDBNewpatiensMonth: any;
  month: string = '';
  cantPatients: number = 0;
  patientNewMonth: number = 0;
  loading1: boolean = false;
  loading2: boolean = false;
  loading3: boolean = false;
  loadingChart: boolean = false;
  //Pacientes por año y mes
  patientNewYearMonth: number = 0;
  filterYear: number = Number(moment().format('YYYY'));
  filterMonth: number = Number(moment().format('M'));
  //Cantidad Frecuentes
  cantFrequent: number = 0;
  //Pacientes inactivos
  inactive: number = 0;
  actives: number = 0;

  // chart nuevos ultimos 12 meses
  dataCharNewPatiens: any = {
    labels: [],
    data: []
  }

  // chart nuevos pacientes en un mes
  dataCharNewPatiensMonth: any = {
    labels: [],
    data: []
  }
  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _modalSerive: NgbModal,
    private _chService: ClinicHistoryService,
    private _dateService: DateService,
    private _reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.month = this._dateService.getMonthString(Number(moment().format('M')));
    this.getCantPatient();
    //this.getPatientNewMonth();
    //this.getCantFrequent();
    this.getPatientNewYearMonth();
    this.getDataChartNewPatiens();
    this.getDataChartNewPatiensMonth();
  }

  /**
   * Metodo que retorna la cantidad
   * de pacientes nuevos con tratamiento
   */
  getPatientNewMonth(){
    this.loading2 = true;
    this.patientNewMonth = 0;
    const month = Number(moment().format('M'));
    const year = Number(moment().format('yyyy'));
    this._chService.getPatientNew(year,month)
    .subscribe(
      res => {
        this.loading2 = false;
        this.patientNewMonth = res.total;
      },
      error => {
        this.loading2 = false;
      }
    );
  }

  /**
   * Metodo que retorna la cantidad
   * de pacientes nuevos con tratamiento
   * por mes y año
   */
   getPatientNewYearMonth(){
    this.loading3 = true;
    this.patientNewYearMonth = 0;
    this._chService.getPatientNew(this.filterYear,this.filterMonth)
    .subscribe(
      res => {
        this.patientNewYearMonth = res.total;
        this.loading3 = false;
      },
      error => {
        this.loading3 = false;
      }
    );
  }

  getCantPatient(){
    this.loading2 = true;
    this.cantPatients = 0;
    this._chService.getCant()
    .subscribe(
      res => {
        this.loading1 = false;
        this.cantPatients = res;
        this.getInactives();
      },
      error => {
        this.loading1 = false;
      }
    );
  }

  /**
   * Metodo para obtener la cantidad
   * de pacientes frecuentes
   */
  getCantFrequent(): void{
    this.cantFrequent = 0;
    const since = moment().subtract(1,'year').format('YYYY-MM-DD');
    const until = moment().format('YYYY-MM-DD');
    this._reservationService.getPatientFrequenCant(since,until)
    .subscribe(
      res => {
        this.cantFrequent = res.length;
      },
      err => {}
    );
  }

  /**
   * Metodo para obtener la cantidad
   * de pacientes inactivos
   * Pacientes sin atenciones en los 2 ultimos años se consideran inactivos
   */
  getInactives(): void{
    this.loadingChart = false;
    this.cantFrequent = 0;
    const since = moment().subtract(2,'years').format('YYYY-MM-DD');
    const until = moment().format('YYYY-MM-DD');
    this._reservationService.getPatientFrequenCant(since,until)
    .subscribe(
      res => {
        this.loadingChart = true;
        this.inactive = this.cantPatients - res.length;
        this.actives = this.cantPatients - this.inactive;
        this.setDataChart();
      },
      err => {
        this.loadingChart = false;
      }
    );
  }

  getDataChartNewPatiens(): void{
    this.dataCharNewPatiens = {
      labels: [],
      data: []
    }
    this._chService.getDataReportNewPatiens()
    .subscribe(
      res => {
        this.dataCharNewPatiens.labels = res.map(x => x.mes);
        this.dataCharNewPatiens.data = res.map(x => x.cantidad);
        this.setChartNewPatients();
      },
      err => {}
    );
  }

  getDataChartNewPatiensMonth(): void{
    this.dataCharNewPatiensMonth = {
      labels: [],
      data: []
    }
    this.loading3 = true;
    this._chService.getDataReportNewPatiensMonth(this.filterYear,this.filterMonth)
    .subscribe(
      res => {
        this.loading3 = false;
        this.dataCharNewPatiensMonth.labels = res.map(x => x.dia);
        this.dataCharNewPatiensMonth.data = res.map(x => x.cantidad);
        this.setChartNewPatientsMonth();
      },
      err => {
        this.loading3 = false;
      }
    );
  }


  setDataChart(){
    this.chartDB = {
      chart: {
        height: 150,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%'
          }
        }
      },
      labels: ['Nuevos', 'Inactivos'],
      series: [this.actives, this.inactive],
      legend: {
        show: false
      },
      tooltip: {
        theme: 'datk'
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 0
        },
      },
      colors: ['#4680ff', '#dc3545'],
      fill: {
        opacity: [1, 1]
      },
      stroke: {
        width: 0,
      }
    }
  }

  onPrint(){
    this.spinner.show();
    const since = moment().subtract(1,'year').format('YYYY-MM-DD');
    const until = moment().format('YYYY-MM-DD');
    this._reservationService.getPatientFrequenPdf(since,until).subscribe(
      res => {
        this.spinner.hide();
        const modal = this._modalSerive.open(ViewPdfComponent,{size: 'xl'});
        modal.componentInstance.title = 'Reporte - Clientes Frecuentes.';
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

  setChartNewPatients(): void {
    this.chartDBNewpatiens = {
      series: [
        {
          name: "Registrados",
          data: this.dataCharNewPatiens.data
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: this.dataCharNewPatiens.labels,
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
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
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val;
          }
        }
      },
      title: {
        text: "Pacientes nuevos últimos 12 meses",
        floating: 0,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    }
  }

  setChartNewPatientsMonth(): void {
    this.chartDBNewpatiensMonth = {
      series: [
        {
          name: "Registrados",
          data: this.dataCharNewPatiensMonth.data
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: this.dataCharNewPatiensMonth.labels,
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
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
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function(val) {
            return val;
          }
        }
      },
      title: {
        text: "Pacientes nuevos del mes "+this.filterMonth +" de "+this.filterYear,
        floating: 0,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    }
  }
}
