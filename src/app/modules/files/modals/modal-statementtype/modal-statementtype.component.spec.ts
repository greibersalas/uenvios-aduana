import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatementTypeComponent } from './modal-statementtype.component';

describe('ModalStatementTypeComponent', () => {
  let component: ModalStatementTypeComponent;
  let fixture: ComponentFixture<ModalStatementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalStatementTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalStatementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
