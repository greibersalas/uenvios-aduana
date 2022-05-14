import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLabComponent } from './report-lab.component';

describe('ReportLabComponent', () => {
  let component: ReportLabComponent;
  let fixture: ComponentFixture<ReportLabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportLabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
