import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';

import { ProgramationService } from 'src/app/service/programation.service';
import { ReservationService } from 'src/app/service/main/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MedicalAppointmentComponent } from '../medical-appointment/medical-appointment.component';
import { AuditComponent } from '../audit/audit.component';

export class Formdetail{
  environment: string;
  doctor: string;
  appointment: string;
  patient: string;
  reason: string;
  data: any;
  id?: number;
  doctor2?: string;
  idenvironment?: number;
  product?: string;
}

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {

  @Input() id: number;
  formInput: Formdetail;
  formInputOld: Formdetail;
  confirm = false;
  can_delete: boolean;
  can_update: boolean;
  iduser = 0;
  constructor(
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private _serviceReservation: ProgramationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _reservationService: ReservationService,
    private auth:AuthService,
    private route: ActivatedRoute,
    private _modalSerive: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initPermissions();
    this.formInput = {
      environment: '',
      doctor: '',
      appointment: '',
      patient: '',
      reason: '',
      data: {},
      doctor2: ''
    };
    this.get();
    this.iduser = Number(sessionStorage.getItem('iduser'));
  }

  initPermissions(): void{
    this.route.data.subscribe(res => {
      this.auth.hasPermissionsDelete(res.permissions).subscribe( res => {
        this.can_delete = !res;
      });
      this.auth.hasPermissionsUpdate(res.permissions).subscribe( res => {
        this.can_update = !res;
      });

    });
  }

  get(): void{
    this.spinner.show();
    this._serviceReservation.getOne(this.id).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.formInput = {
          environment: res.environment,
          idenvironment: res.idenvironment,
          doctor: res.doctor,
          appointment: res.appointment,
          patient: `${res.patient}`,
          reason: res.reason,
          data: res,
          doctor2: res.doctor2,
          product: res.product
        };
        if (res.state === 2){
          this.confirm = true;
        }
      },
      err => {
        this.spinner.hide();
      }
    );
  }

  setReProgramation(){
    sessionStorage.removeItem("oldreservation");
    Swal.fire({
      title: 'Atención!!!!',
      text: 'Para realizar la reprogramación seleccione la nueva fecha y hora en el calendario',
      type: 'info',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete: any) => {
      //console.log(willDelete);
        if (willDelete.value) {
          //console.log(this.formInput);
          sessionStorage.setItem("oldreservation",this.formInput.data.id);
          this.activeModal.close('Close');
        }
    });
  }

  cancelAppointment(data: Formdetail): void{
    Swal.fire({
      title: 'Atención!!!!',
      text: `Esta seguro que desea cancelar la cita del paciente ${data.patient} en el
      horario ${data.appointment} en el consultorio ${data.environment}`,
      type: 'info',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete: any) => {
      //console.log(willDelete);
        if (willDelete.value) {
          this.spinner.show();
          this._serviceReservation.cancel(this.formInput.data.id)
          .subscribe(
            res => {
              this.spinner.hide();
              this.toastr.success(
                'Ok!','La cita fue cancelada',
                {timeOut: 4000, progressBar: true}
              );
              this.activeModal.close('Save click');
            },
            err => {
              this.spinner.hide();
              this.toastr.error(
                'Atención!','Ocurrio un error al cancelar la cita',
                {timeOut: 4000, progressBar: true}
              );
            }
          );
        }
    });
  }

  setConfirm(): void{
    console.log();
    if(this.confirm){
      Swal.fire({
        title: 'Atención!!!!',
        text: '¿Está seguro que desea confirmar la cita?',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true
      }).then((willDelete) => {
          if (willDelete.value) {
            this._reservationService.confirm(this.formInput.data.id,2)
            .subscribe(
              res => {
                Swal.fire('ok!', 'Cita confirmada correctamente', 'success');
              },
              err => {
                Swal.fire('Error!', 'Confirmar la cita', 'error');
              }
            );
          }else{
            this.confirm = false;
          }
      });
    }else{
      Swal.fire({
        title: 'Atención!!!!',
        text: '¿Está seguro que desea quitar la confirmación de la cita?',
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true
      }).then((willDelete) => {
          if (willDelete.value) {
            this._reservationService.confirm(this.formInput.data.id,1)
            .subscribe(
              res => {
                Swal.fire('ok!', 'Se ha quitado el confirmado a la cita', 'success');
              },
              err => {
                Swal.fire('Error!', 'Confirmar la cita', 'error');
              }
            );
          }else{
            this.confirm = false;
          }
      });
    }
    
  }

  editMedicalAppointment(data: any): void{
    const modal = this._modalSerive.open(MedicalAppointmentComponent,{size: 'lg'});
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        this.activeModal.close('Save click');
      }
    });
    data.data.acction = 'edit';
    modal.componentInstance.data = data.data;
  }

  setAudit(id: number): void{
    const modal = this._modalSerive.open(AuditComponent,{size: 'lg'});//
    modal.result.then((result:any) => {
      if(result === 'Save click'){
        //
      }
    });
    modal.componentInstance.id = this.id;
    modal.componentInstance.module = 'Reservation';
  }
}
