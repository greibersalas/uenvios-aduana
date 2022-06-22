import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashSaleComponent } from './dash-sale.component';

describe('DashSaleComponent', () => {
  let component: DashSaleComponent;
  let fixture: ComponentFixture<DashSaleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
