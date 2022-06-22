import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeBoxComponent } from './theme-box.component';

describe('ThemeBoxComponent', () => {
  let component: ThemeBoxComponent;
  let fixture: ComponentFixture<ThemeBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
