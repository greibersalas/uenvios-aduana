import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementtypeComponent } from './statementtype.component';

describe('StatementtypeComponent', () => {
  let component: StatementtypeComponent;
  let fixture: ComponentFixture<StatementtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatementtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
