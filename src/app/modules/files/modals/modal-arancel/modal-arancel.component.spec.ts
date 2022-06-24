import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArancelComponent } from './modal-arancel.component';

describe('ModalArancelComponent', () => {
  let component: ModalArancelComponent;
  let fixture: ComponentFixture<ModalArancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalArancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalArancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
