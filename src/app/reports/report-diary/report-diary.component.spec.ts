import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDiaryComponent } from './report-diary.component';

describe('ReportDiaryComponent', () => {
  let component: ReportDiaryComponent;
  let fixture: ComponentFixture<ReportDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
