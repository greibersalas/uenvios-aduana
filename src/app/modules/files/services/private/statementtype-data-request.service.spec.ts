import { TestBed } from '@angular/core/testing';

import { StatementtypeDataRequestService } from './statementtype-data-request.service';

describe('StatementtypeDataRequestService', () => {
  let service: StatementtypeDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementtypeDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
