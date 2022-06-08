import { TestBed } from '@angular/core/testing';

import { CustomsDataRequestService } from './customs-data-request.service';

describe('CustomsDataRequestService', () => {
  let service: CustomsDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomsDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
