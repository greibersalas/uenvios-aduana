import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrtChartJsComponent } from './crt-chart-js.component';

describe('CrtChartJsComponent', () => {
  let component: CrtChartJsComponent;
  let fixture: ComponentFixture<CrtChartJsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtChartJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtChartJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
