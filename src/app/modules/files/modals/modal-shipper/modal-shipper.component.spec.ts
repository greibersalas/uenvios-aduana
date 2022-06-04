import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShipperComponent } from './modal-shipper.component';

describe('ModalShipperComponent', () => {
  let component: ModalShipperComponent;
  let fixture: ComponentFixture<ModalShipperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShipperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
