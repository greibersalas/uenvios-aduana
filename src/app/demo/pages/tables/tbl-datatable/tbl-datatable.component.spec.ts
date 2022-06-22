import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TblDatatableComponent } from './tbl-datatable.component';

describe('TblDatatableComponent', () => {
  let component: TblDatatableComponent;
  let fixture: ComponentFixture<TblDatatableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TblDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
