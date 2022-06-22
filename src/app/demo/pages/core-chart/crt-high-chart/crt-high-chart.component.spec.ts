import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrtHighChartComponent } from './crt-high-chart.component';

describe('CrtHighChartComponent', () => {
  let component: CrtHighChartComponent;
  let fixture: ComponentFixture<CrtHighChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtHighChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtHighChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
