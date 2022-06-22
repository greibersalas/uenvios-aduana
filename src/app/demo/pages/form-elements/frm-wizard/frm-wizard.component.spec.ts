import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FrmWizardComponent } from './frm-wizard.component';

describe('FrmWizardComponent', () => {
  let component: FrmWizardComponent;
  let fixture: ComponentFixture<FrmWizardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
