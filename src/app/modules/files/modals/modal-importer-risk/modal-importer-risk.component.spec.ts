import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalImporterRiskComponent } from './modal-importer-risk.component';

describe('ModalImporterRiskComponent', () => {
  let component: ModalImporterRiskComponent;
  let fixture: ComponentFixture<ModalImporterRiskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImporterRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImporterRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
