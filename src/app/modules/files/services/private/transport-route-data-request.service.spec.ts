import { TestBed } from '@angular/core/testing';

import { TransportRouteDataRequestService } from './transport-route-data-request.service';

describe('TransportRouteDataRequestService', () => {
  let service: TransportRouteDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportRouteDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
