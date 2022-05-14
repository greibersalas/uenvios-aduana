import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportClinicHistoryComponent } from './report-clinic-history.component';

describe('ReportClinicHistoryComponent', () => {
  let component: ReportClinicHistoryComponent;
  let fixture: ComponentFixture<ReportClinicHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportClinicHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportClinicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
