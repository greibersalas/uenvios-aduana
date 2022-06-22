import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArancelComponent } from './arancel.component';

describe('ArancelComponent', () => {
  let component: ArancelComponent;
  let fixture: ComponentFixture<ArancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
