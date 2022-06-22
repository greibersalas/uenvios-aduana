import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrtPeityComponent } from './crt-peity.component';

describe('CrtPeityComponent', () => {
  let component: CrtPeityComponent;
  let fixture: ComponentFixture<CrtPeityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrtPeityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrtPeityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
