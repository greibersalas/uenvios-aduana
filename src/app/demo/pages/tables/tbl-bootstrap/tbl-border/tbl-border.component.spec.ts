import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TblBorderComponent } from './tbl-border.component';

describe('TblBorderComponent', () => {
  let component: TblBorderComponent;
  let fixture: ComponentFixture<TblBorderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TblBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
