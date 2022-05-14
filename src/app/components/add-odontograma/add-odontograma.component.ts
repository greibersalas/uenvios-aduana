import { Component, EventEmitter, HostListener, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-odontograma',
  templateUrl: './add-odontograma.component.html',
  styleUrls: ['./add-odontograma.component.scss'],
  providers: [NgbModalConfig]
})
export class AddOdontogramaComponent implements OnInit {

  @Input() data: any;
  @Input() origin: string;
  @Input() odontograma: any;
  active: number = 1;

  constructor(config: NgbModalConfig,public activeModal: NgbActiveModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  close(data: any): void{
    this.activeModal.close(data);
  }

}
