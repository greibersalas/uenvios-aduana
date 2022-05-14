import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentDoctorComponent } from './environment-doctor.component';

describe('EnvironmentDoctorComponent', () => {
  let component: EnvironmentDoctorComponent;
  let fixture: ComponentFixture<EnvironmentDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvironmentDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
