import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCategoriesComponent } from './modal-categories.component';

describe('ModalCategoriesComponent', () => {
  let component: ModalCategoriesComponent;
  let fixture: ComponentFixture<ModalCategoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
