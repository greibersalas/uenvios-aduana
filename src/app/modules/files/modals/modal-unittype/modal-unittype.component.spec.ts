import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnittypeComponent } from './modal-unittype.component';

describe('ModalUnittypeComponent', () => {
  let component: ModalUnittypeComponent;
  let fixture: ComponentFixture<ModalUnittypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUnittypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUnittypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
