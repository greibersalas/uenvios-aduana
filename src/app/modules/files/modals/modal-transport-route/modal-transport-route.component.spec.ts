import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransportRouteComponent } from './modal-transport-route.component';

describe('ModalTransportRouteComponent', () => {
  let component: ModalTransportRouteComponent;
  let fixture: ComponentFixture<ModalTransportRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTransportRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTransportRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
