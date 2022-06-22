import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeparmentsComponent } from './deparments.component';

describe('DeparmentsComponent', () => {
  let component: DeparmentsComponent;
  let fixture: ComponentFixture<DeparmentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeparmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
