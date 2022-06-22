import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThemeLightComponent } from './theme-light.component';

describe('ThemeLightComponent', () => {
  let component: ThemeLightComponent;
  let fixture: ComponentFixture<ThemeLightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeLightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
