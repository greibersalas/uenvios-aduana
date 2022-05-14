import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAttentionComponent } from './medical-attention.component';

describe('MedicalAttentionComponent', () => {
  let component: MedicalAttentionComponent;
  let fixture: ComponentFixture<MedicalAttentionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalAttentionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
