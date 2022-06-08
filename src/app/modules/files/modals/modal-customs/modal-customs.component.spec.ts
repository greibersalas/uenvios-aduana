import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCustomsComponent } from './modal-customs.component';

describe('ModalCustomsComponent', () => {
  let component: ModalCustomsComponent;
  let fixture: ComponentFixture<ModalCustomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCustomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCustomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
