import { TestBed } from '@angular/core/testing';

import { ShipperDataRequestService } from './shipper-data-request.service';

describe('ShipperDataRequestService', () => {
  let service: ShipperDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipperDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
