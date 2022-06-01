import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { TransportRoute } from '../../models/transport-route';
import { TransportRouteService } from '../../services/public/transport-route.service';

export interface FormTransportRoute {
  code: string;
  description: string;
}

@Component({
  selector: 'app-modal-transport-route',
  templateUrl: './modal-transport-route.component.html',
  styles: []
})
export class ModalTransportRouteComponent implements OnInit {

  @Input() id: number;
  formInput: FormTransportRoute;

  constructor(
    private transportrouteService: TransportRouteService,
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.clear();
    this.setFormData();
  }

  

  clear(): void{
    this.formInput = {
      code: '',
      description: '',
      
    };
  }

  setFormData(): void{
    this.transportrouteService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description = res.description;
     
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const transportroute: TransportRoute = new TransportRoute();
    if (this.id === 0){
      transportroute.idtransportroute = 0;
      transportroute.code = this.formInput.code;
      transportroute.description = this.formInput.description;
     
      
      this.transportrouteService.insert(transportroute).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'TransportRoute registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar la via de transporte',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      transportroute.idtransportroute = this.id;
      transportroute.code = this.formInput.code;
      transportroute.description = this.formInput.description;
      

      this.transportrouteService.update(this.id,transportroute).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'El pais se actualizo correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al actulizar el la via de transporte',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}
