import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLineFormComponent } from './business-line-form.component';

describe('BusinessLineFormComponent', () => {
  let component: BusinessLineFormComponent;
  let fixture: ComponentFixture<BusinessLineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessLineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessLineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
