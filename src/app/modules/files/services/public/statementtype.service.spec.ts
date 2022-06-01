import { TestBed } from '@angular/core/testing';

import { StatementtypeService } from './statementtype.service';

describe('StatementtypeService', () => {
  let service: StatementtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
