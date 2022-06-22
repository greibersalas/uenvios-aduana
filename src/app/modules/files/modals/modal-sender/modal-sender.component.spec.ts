import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalSenderComponent } from './modal-sender.component';

describe('ModalSenderComponent', () => {
  let component: ModalSenderComponent;
  let fixture: ComponentFixture<ModalSenderComponent>;

  beforeEach(waitForAsync(() => {
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
