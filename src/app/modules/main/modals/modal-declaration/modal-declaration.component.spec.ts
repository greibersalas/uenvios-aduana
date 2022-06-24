import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeclarationComponent } from './modal-declaration.component';

describe('ModalDeclarationComponent', () => {
  let component: ModalDeclarationComponent;
  let fixture: ComponentFixture<ModalDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
