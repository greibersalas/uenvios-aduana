import { Component, Input, OnInit } from '@angular/core';

// Models
import { Ubigeo } from '../../models/ubigeo.model'; 

@Component({
  selector: 'app-modal-ubigeo',
  templateUrl: './modal-ubigeo.component.html',
  styles: []
})
export class ModalUbigeoComponent implements OnInit {

  @Input() id: number;
  formInput: Ubigeo;

  constructor() { }

  ngOnInit(): void {
  }

  setFormData(): void{
    //
  }

}
