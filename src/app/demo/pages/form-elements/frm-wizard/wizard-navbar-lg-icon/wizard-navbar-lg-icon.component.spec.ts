import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WizardNavbarLgIconComponent } from './wizard-navbar-lg-icon.component';

describe('WizardNavbarLgIconComponent', () => {
  let component: WizardNavbarLgIconComponent;
  let fixture: ComponentFixture<WizardNavbarLgIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardNavbarLgIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardNavbarLgIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
