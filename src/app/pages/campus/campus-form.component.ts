import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

import { CampusModel } from 'src/app/models/campus.model';
import { CampusService } from 'src/app/service/campus.service';

@Component({
    selector: 'app-campus-form',
    templateUrl: './campus-form.component.html'
})
export class CampusFormComponent implements OnInit {

    @Input() data: CampusModel;

    formInput: CampusModel;
    public isSubmit: boolean;
    public processing: boolean = false;
  
    constructor(config: NgbModalConfig,public activeModal: NgbActiveModal,private toastr: ToastrService,
        private _campusServices: CampusService) { 
        config.backdrop = 'static';
        config.keyboard = false;
    }
    
    ngOnInit(): void {
      this.clear();
      this.formInput = this.data;
    }

    clear(){
        this.formInput = {
          id: 0,
          name: '',
          description: ''
        };
    }

    save(form: any) {    
        if (!form.valid) {
          this.isSubmit = true;
          return;
        }else{
          console.log(this.formInput);
          this.processing = true;
          if(this.formInput.id === 0){
            //insert new campus
            this._campusServices.insert(this.formInput)
            .subscribe(
              res => {
                this.processing = false;
                this.toastr.success('Sede insertada correctamente!!!', 'Ok!', {
                  timeOut: 3000,
                });
                this.clear();
                this.activeModal.close('Save click');
              },
              err =>{
                this.processing = false;
                console.log(err.error);
                this.toastr.error('Atención, ha ocurrido un error al insertar la sede.', 'Error!', {
                  timeOut: 3000,
                });
              }
            );
          }else if(this.formInput.id > 0){
            this._campusServices.update(this.formInput,this.formInput.id)
            .subscribe(
              res => {
                this.processing = false;
                this.clear();
                this.activeModal.close('Save click');
                this.toastr.success('Sede editada correctamente!!', 'Ok!', {
                  timeOut: 3000,
                });
              },
              err => {
                this.processing = false;
                console.log(err.error);
                this.toastr.error('Atención, ha ocurrido un error al editar la sede.', 'Error!', {
                  timeOut: 3000,
                });
              }
            )
          }
          
        }
    }
}