import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UbigeoComponent } from './ubigeo.component';

describe('UbigeoComponent', () => {
  let component: UbigeoComponent;
  let fixture: ComponentFixture<UbigeoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UbigeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbigeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
