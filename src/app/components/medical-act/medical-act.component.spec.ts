import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalActComponent } from './medical-act.component';

describe('MedicalActComponent', () => {
  let component: MedicalActComponent;
  let fixture: ComponentFixture<MedicalActComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalActComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
