import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Declaration } from '../../models/declaration.model';
import { DeclarationService } from '../../services/public/declaration.service';
import { FormGeneralComponent } from './forms/form-general/form-general.component';




@Component({
  selector: 'app-modal-declaration',
  templateUrl: './modal-declaration.component.html',
  styles: []
})
export class ModalDeclarationComponent implements OnInit {
 
  @Input() id: number;
  
  
  active = 1;
  disabledSeries = true;

  constructor(
    private declarationService: DeclarationService,
    config: NgbModalConfig,
    public activeModal: NgbActiveModal,
   
   
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    
  }

  ngOnInit(): void {
    if (this.id>0){
      this.disabledSeries = false;
    }
  }

  IdchangeValueEvent(id){
    this.id = id;
    if(this.id > 0){
      this.disabledSeries = false;
    }
    else{
      this.disabledSeries = true;
    }
  }

  

}
