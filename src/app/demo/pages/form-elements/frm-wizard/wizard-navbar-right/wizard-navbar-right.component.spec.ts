import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WizardNavbarRightComponent } from './wizard-navbar-right.component';

describe('WizardNavbarRightComponent', () => {
  let component: WizardNavbarRightComponent;
  let fixture: ComponentFixture<WizardNavbarRightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardNavbarRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardNavbarRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
