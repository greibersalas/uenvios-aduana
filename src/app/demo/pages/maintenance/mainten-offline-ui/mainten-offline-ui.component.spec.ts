import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaintenOfflineUiComponent } from './mainten-offline-ui.component';

describe('MaintenOfflineUiComponent', () => {
  let component: MaintenOfflineUiComponent;
  let fixture: ComponentFixture<MaintenOfflineUiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenOfflineUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenOfflineUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
