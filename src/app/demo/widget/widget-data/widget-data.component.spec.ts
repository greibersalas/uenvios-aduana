import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WidgetDataComponent } from './widget-data.component';

describe('WidgetDataComponent', () => {
  let component: WidgetDataComponent;
  let fixture: ComponentFixture<WidgetDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
