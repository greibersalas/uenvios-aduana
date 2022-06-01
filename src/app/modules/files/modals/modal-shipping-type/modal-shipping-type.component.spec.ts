import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShippingTypeComponent } from './modal-shipping-type.component';

describe('ModalShippingTypeComponent', () => {
  let component: ModalShippingTypeComponent;
  let fixture: ComponentFixture<ModalShippingTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShippingTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShippingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
