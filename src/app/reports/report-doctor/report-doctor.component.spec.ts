import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDoctorComponent } from './report-doctor.component';

describe('ReportDoctorComponent', () => {
  let component: ReportDoctorComponent;
  let fixture: ComponentFixture<ReportDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
