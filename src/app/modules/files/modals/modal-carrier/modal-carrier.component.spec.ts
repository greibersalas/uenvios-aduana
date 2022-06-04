import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarrierComponent } from './modal-carrier.component';

describe('ModalCarrierComponent', () => {
  let component: ModalCarrierComponent;
  let fixture: ComponentFixture<ModalCarrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCarrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
