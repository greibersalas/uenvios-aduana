import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalDocumenttypeComponent } from './modal-documenttype.component';

describe('ModalDocumenttypeComponent', () => {
  let component: ModalDocumenttypeComponent;
  let fixture: ComponentFixture<ModalDocumenttypeComponent>;

  beforeEach(waitForAsync(() => {
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
