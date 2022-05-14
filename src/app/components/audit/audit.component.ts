import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LanguageApp } from 'src/app/config/data-table.language';
import { EnvironmentDoctorService } from 'src/app/service/environment-doctor.service';

// Services
import { ProgramationService } from 'src/app/service/programation.service';
import { AuditService } from '../../service/profile/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  @Input() id: number;
  @Input() module: string;
  dtOptions: DataTables.Settings = {};
  list: any[] = [];
  data: any;
  show = false;
  loading = false;
  loadingEnviront = false;
  environment = '';
  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private serviceReservation: ProgramationService,
    private environmentDoctorServices: EnvironmentDoctorService,
    private auditService: AuditService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.get();
  }

  get(): void{
    this.list = [];
    this.spinner.show();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: LanguageApp.spanish_datatables,
      search: true,
      responsive: true,
      order: [3],
      orderClasses: true
    };
    this.auditService.get(this.id, this.module)
    .subscribe(
      res => {
        this.spinner.hide();
        this.list = res;
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Ocuarrio un error al obtener los datos de la auditoria',
        'Atención', { timeOut: 4000, progressBar: true, closeButton: true});
      }
    );
  }

  showDetail(datos: any): void{
    console.log({datos});
    const { data, description, username, idregister } = datos;
    if (data) {
      const jsondata = JSON.parse(data);
      let title = '';
      if (description === 'Insert registro') {
        title = 'Registro de cita';
        // Busco los datos del consultorio
        this.getEnvironment(Number(jsondata.environment));
      } else if (description === 'Update registro') {
        title = 'Actualización de cita';
        this.environment = jsondata.environment.name;
      }
      let state = 'Por confirmar';
      console.log({estado: jsondata.state});
      if (jsondata.state === 2){
        state = 'confirmada';
      }
      this.loading = true;
      this.serviceReservation.getOne(idregister).subscribe(
        (res: any) => {
          this.loading = false;
          this.data = {
            title,
            date: jsondata.date,
            appointment: jsondata.appointment,
            reason: jsondata.reason,
            user: username,
            patient: res.patient,
            doctor: res.doctor,
            state
          };
          this.show = true;
        },
        err => {
          this.loading = false;
        }
      );
    }
  }

  getEnvironment(id: number): void{
    this.loadingEnviront = true;
    this.environmentDoctorServices.get(id)
    .subscribe(
      res => {
        this.loadingEnviront = false;
        this.environment = res.name;
      },
      err => {}
    );
  }
}
