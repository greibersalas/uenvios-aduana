import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeNavFixedComponent } from './theme-nav-fixed.component';

describe('ThemeNavFixedComponent', () => {
  let component: ThemeNavFixedComponent;
  let fixture: ComponentFixture<ThemeNavFixedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeNavFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeNavFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
