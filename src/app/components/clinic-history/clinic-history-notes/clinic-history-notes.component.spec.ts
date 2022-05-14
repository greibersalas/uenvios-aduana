import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHistoryNotesComponent } from './clinic-history-notes.component';

describe('ClinicHistoryNotesComponent', () => {
  let component: ClinicHistoryNotesComponent;
  let fixture: ComponentFixture<ClinicHistoryNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicHistoryNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicHistoryNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
