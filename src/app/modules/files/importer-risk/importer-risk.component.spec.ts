import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImporterRiskComponent } from './importer-risk.component';

describe('ImporterRiskComponent', () => {
  let component: ImporterRiskComponent;
  let fixture: ComponentFixture<ImporterRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImporterRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImporterRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
