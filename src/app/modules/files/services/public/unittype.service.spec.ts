import { TestBed } from '@angular/core/testing';

import { UnittypeService } from './unittype.service';

describe('UnittypeService', () => {
  let service: UnittypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnittypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
