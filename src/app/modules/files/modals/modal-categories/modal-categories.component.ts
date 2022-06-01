import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

// Model
import { Categories } from '../../models/categories.model';
import { CategoriesService } from '../../services/public/categories.service';

export interface FormCategories {
  code: string;
  description: string;
  
}

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styles: []
})
export class ModalCategoriesComponent implements OnInit {

  @Input() id: number;
  formInput: FormCategories;

  constructor(
    private categoriesService: CategoriesService,
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
    this.categoriesService.getOne(this.id).subscribe(res=>{
      this.formInput.code = res.code;
      this.formInput.description= res.description;
    })
  }

  onSubmit(): void{
    this.spinner.show();
    const categories: Categories = new Categories();
    if (this.id === 0){
      categories.idcategories = 0;
      categories.code = this.formInput.code;
      categories.description= this.formInput.description;
      
      
      this.categoriesService.insert(categories).subscribe(
        resp => {
          this.spinner.hide();
          this.toastr.success(
            'Categories registrado correctamente',
            'Ok!',
            { timeOut: 3500, progressBar: true }
          );
          this.activeModal.close('Save click');
        },
        err => {
          this.spinner.hide();
          this.toastr.error(
            'Ocurrio un error al registrar el Categories',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }else{
      categories.idcategories = this.id;
      categories.code = this.formInput.code;
      categories.description = this.formInput.description;
    

      this.categoriesService.update(this.id,categories).subscribe(
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
            'Ocurrio un error al actulizar el Pais',
            'Atención!',
            { timeOut: 3500, progressBar: true }
          );
        }
      );
    }
  }

}

