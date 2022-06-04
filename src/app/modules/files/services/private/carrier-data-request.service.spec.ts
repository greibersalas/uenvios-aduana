import { TestBed } from '@angular/core/testing';

import { CarrierDataRequestService } from './carrier-data-request.service';

describe('CarrierDataRequestService', () => {
  let service: CarrierDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrierDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
