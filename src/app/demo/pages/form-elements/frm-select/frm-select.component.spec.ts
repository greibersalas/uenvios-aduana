import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrmSelectComponent } from './frm-select.component';

describe('FrmSelectComponent', () => {
  let component: FrmSelectComponent;
  let fixture: ComponentFixture<FrmSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
