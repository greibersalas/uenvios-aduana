import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TblStylingComponent } from './tbl-styling.component';

describe('TblStylingComponent', () => {
  let component: TblStylingComponent;
  let fixture: ComponentFixture<TblStylingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TblStylingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblStylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
