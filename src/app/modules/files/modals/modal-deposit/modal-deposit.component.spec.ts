import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalDepositComponent } from './modal-deposit.component';

describe('ModalDepositComponent', () => {
  let component: ModalDepositComponent;
  let fixture: ComponentFixture<ModalDepositComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
