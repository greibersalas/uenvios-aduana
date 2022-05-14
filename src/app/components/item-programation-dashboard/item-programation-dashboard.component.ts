import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EnvironmentDoctorModel } from 'src/app/models/environment-doctor.model';
import { ProgramationService } from 'src/app/service/programation.service';
import { ChartDB } from '../../fack-db/chart-data';
import { ApexChartService } from '../../theme/shared/components/chart/apex-chart/apex-chart.service';
import * as moment from 'moment';

@Component({
  selector: 'app-item-programation-dashboard',
  templateUrl: './item-programation-dashboard.component.html',
  styleUrls: ['./item-programation-dashboard.component.scss']
})
export class ItemProgramationDashboardComponent implements OnInit, OnDestroy {
  @Input() environment: EnvironmentDoctorModel;
  loaded:boolean = false;
  public chartDB: any;
  public dailyVisitorStatus: string;
  public dailyVisitorAxis: any;
  public taskRate: number;

  public lastDate: number;
  public siteVisitorCAC: any;
  public data: any;

  public intervalSub: any;
  public intervalMain: any;
  tYear: number;
  tMonth: number;
  tToday: number;

  dataYear = []
  categeriesYear = []

  rangeToDay:string = ''
  rangeToMonth:string = ''
  rangeToYear:string = ''

  month = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  days = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']

  chartDays = {
    chart: {
      height: 150,
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'straight',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#ffb64d'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 0.9,
        opacityTo: 0.5,
        stops: [0, 100, 100, 100]
      },
    },
    yaxis: {
      labels: {
        show: true,
        maxWidth: 20,
      }
    },
    xaxis: {
      categories: [],
    },
    colors: ['#ffb64d'],
    series: [{
      name: 'Citas',
      data: []
    }],
    grid: {
      row: {
        opacity: 0.5
      }
    },
  };
  
  chartYear = {
    chart: {
      height: 150,
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'straight',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#4099ff'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 0.9,
        opacityTo: 0.5,
        stops: [0, 100, 100, 100]
      },
    },
    yaxis: {
      labels: {
        show: true,
        maxWidth: 20,
      }
    },
    xaxis: {
      categories: this.categeriesYear,
    },
    colors: ['#4099ff'],
    series: [{
      name: 'Citas',
      data: this.dataYear
    }],
    grid: {
      row: {
        opacity: 0.5
      }
    },
  };

  chartMonth = {
    chart: {
      height: 150,
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      curve: 'straight',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: ['#2ed8b6'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 0.9,
        opacityTo: 0.5,
        stops: [0, 100, 100, 100]
      },
    },
    yaxis: {
      labels: {
        show: true,
        maxWidth: 20,
      }
    },
    xaxis: {
      categories: [],
    },
    colors: ['#2ed8b6'],
    series: [{
      name: 'Citas',
      data: []
    }],
    grid: {
      row: {
        opacity: 0.5
      }
    },
  };



  constructor(
    public apexEvent: ApexChartService,
    private _reservation: ProgramationService
    ) {
    this.chartDB = ChartDB;

    this.dailyVisitorStatus = '1y';
    this.taskRate = 10;

    this.lastDate = 0;
    this.data = [];

    this.getDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 10, {min: 10, max: 90});
    this.siteVisitorCAC = {
      chart: {
        height: 300,
        type: 'area',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 2000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      series: [{
        name: 'active Users :',
        data: this.data
      }],
      colors: ['#ff5252'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 0.8,
          opacityTo: 0,
          stops: [0, 100]
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: 777600000,
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    };
  }

  ngOnInit() {
    this.getEnviroment();
    this.intervalSub = setInterval(() => {
      this.getNewSeries(this.lastDate, {min: 10, max: 90});
      this.apexEvent.eventChangeSeriesData();
    }, 2000);

    this.intervalMain = setInterval(() => {
      this.resetData();
      this.apexEvent.eventChangeSeriesData();
    }, 60000);

  }

  ngOnDestroy() {
    if (this.intervalSub) {
      clearInterval(this.intervalSub);
    }
    if (this.intervalMain) {
      clearInterval(this.intervalMain);
    }
  }

  dailyVisitorEvent(status) {
    this.dailyVisitorStatus = status;
    switch (status) {
      case '1m':
        this.dailyVisitorAxis = {
          min: new Date('28 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        };
        break;
      case '6m':
        this.dailyVisitorAxis = {
          min: new Date('27 Sep 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case '1y':
        this.dailyVisitorAxis = {
          min: new Date('27 Feb 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'ytd':
        this.dailyVisitorAxis = {
          min: new Date('01 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'all':
        this.dailyVisitorAxis = {
          min: undefined,
          max: undefined
        };
        break;
    }

    setTimeout(() => {
      this.apexEvent.eventChangeTimeRange();
    });
  }

  getDayWiseTimeSeries(baseval, count, yrange) {
    let i = 0;
    while (i < count) {
      const x = baseval;
      const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      this.data.push({x, y});
      this.lastDate = baseval;
      baseval += 86400000;
      i++;
    }
  }

  resetData() {
    this.data = this.data.slice(this.data.length - 10, this.data.length);
  }

  getNewSeries(baseval, yrange) {
    const newDate = baseval + 86400000;
    this.lastDate = newDate;
    this.data.push({
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    });
  }

  getEnviroment(){
      this._reservation.getResumeByCharDay(this.environment.id).subscribe((data)=>{
          this.setTotalToday(data)
          this.setTotalMothLast(data)
          this.setTotalByYear(data)
          this.getDataCharByLastSevenDay(data);
          this.getDataCharFourWeekLast(data);
          this.getDataCharByLastYear(data);
          this.loaded = true
      })
  }

  setTotalToday(data){
    this.tToday = 0
    var today = moment().format('YYYY-MM-DD');
    data.forEach((d)=>{
      var date = moment(d.date).format('YYYY-MM-DD')
      if (moment(date).isSame(today))
        this.tToday += Number(d.total)
    })
    this.rangeToDay = moment().locale('es').format('ll')
  }

  setTotalMothLast(data){
    this.tMonth = 0
    var fend = moment().format('YYYY-MM-DD');
    var fini = moment().subtract(30,'d').format('YYYY-MM-DD')
    this.rangeToMonth = moment().locale('es').subtract(30,'d').format('ll')+' - '+ moment().locale('es').format('ll')
    data.forEach((d)=>{
      var date = moment(d.date).format('YYYY-MM-DD')
      if (moment(date).isSameOrAfter(fini) && moment(date).isSameOrBefore(fend))
        this.tMonth += Number(d.total)
    })
  }

  getDataCharFourWeekLast(res:any){
    var data = []
    var categorias = []
    for (var i = 0 ; i < 4 ; i++){
      var week = moment().subtract(i,'weeks').week()
      categorias.push("Sem "+String(week))
      var cont = 0
      res.forEach(d => {
        var weekOfMonth = moment(d.date).week()
        if (week == weekOfMonth){
          cont += 1
        }
        
      })
      data.push(cont)
      
    }
    this.setDataCharMonth(data,categorias)
    console.log(categorias, data)
  }

  setDataCharMonth(data,categorias){
    this.chartMonth.xaxis.categories = categorias.reverse()
    this.chartMonth.series[0].data = data.reverse()
    this.apexEvent.eventChangeSeriesData();
  }

  setTotalByYear(data){
    this.tYear = 0
    data.forEach((d)=>{
      this.tYear += Number(d.total)
    })
    this.rangeToYear = moment().locale('es').subtract(335,'d').format('ll')+' - '+moment().locale('es').format('ll');
  }

  getDataCharByLastSevenDay(res:any){
    var data = []
    var categorias = []
    for(var i = 0;i<7;i++){
      var day = moment().subtract(i,'d')
      var date = day.format('YYYY-MM-DD')
      var numberDay = day.day();
      var cont = 0
      res.forEach(d => {
        var date_obj =  moment(d.date).format('YYYY-MM-DD')
        if (moment(date).isSame(date_obj))
          cont += Number(d.total)

      });
      
      data.push(cont)
      categorias.push(this.days[numberDay])
      
    }
    //console.log(data, categorias)
    this.setDataCharDay(data, categorias)
   
  }

  setDataCharDay(data,categorias){
    this.chartDays.xaxis.categories = categorias.reverse()
    this.chartDays.series[0].data = data.reverse()
    this.apexEvent.eventChangeSeriesData();
  }

  getDataCharByLastYear(res:any){
    var data = []
    var categorias = []
    for(var i = 0;i<12;i++){
      var day = moment().subtract(i,'months')
      var date = day.format('YYYY-MM-DD')
      var numberMonth = day.month();
      var cont = 0
      res.forEach(d => {
        var date_obj =  moment(d.date).format('YYYY-MM-DD')
        if (moment(date).isSame(date_obj,'month'))
          cont += Number(d.total)

      });
      
      data.push(cont)
      categorias.push(this.month[numberMonth])
      
    }
    //console.log(data, categorias)
    this.setDataCharYear(data, categorias)
   
  }

  setDataCharYear(data, categorias){
    this.chartYear.xaxis.categories = categorias.reverse()
    this.chartYear.series[0].data = data.reverse()
    this.apexEvent.eventChangeSeriesData();
  }

}
