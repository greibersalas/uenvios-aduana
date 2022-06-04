import { TestBed } from '@angular/core/testing';

import { DepositDataRequestService } from './deposit-data-request.service';

describe('DepositDataRequestService', () => {
  let service: DepositDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepositDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
