import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramationComponent } from './programation.component';

describe('ProgramationComponent', () => {
  let component: ProgramationComponent;
  let fixture: ComponentFixture<ProgramationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
