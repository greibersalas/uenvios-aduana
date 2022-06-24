import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSenderComponent } from './modal-sender.component';

describe('ModalSenderComponent', () => {
  let component: ModalSenderComponent;
  let fixture: ComponentFixture<ModalSenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
