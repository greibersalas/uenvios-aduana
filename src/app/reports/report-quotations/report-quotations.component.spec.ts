import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportQuotationsComponent } from './report-quotations.component';

describe('ReportQuotationsComponent', () => {
  let component: ReportQuotationsComponent;
  let fixture: ComponentFixture<ReportQuotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportQuotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
