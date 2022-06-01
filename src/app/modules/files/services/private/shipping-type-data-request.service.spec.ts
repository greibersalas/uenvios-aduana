import { TestBed } from '@angular/core/testing';

import { ShippingTypeDataRequestService } from './shipping-type-data-request.service';

describe('ShippingTypeDataRequestService', () => {
  let service: ShippingTypeDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingTypeDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
