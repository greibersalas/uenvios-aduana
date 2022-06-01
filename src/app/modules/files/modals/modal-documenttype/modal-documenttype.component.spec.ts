import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocumenttypeComponent } from './modal-documenttype.component';

describe('ModalDocumenttypeComponent', () => {
  let component: ModalDocumenttypeComponent;
  let fixture: ComponentFixture<ModalDocumenttypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDocumenttypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDocumenttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
