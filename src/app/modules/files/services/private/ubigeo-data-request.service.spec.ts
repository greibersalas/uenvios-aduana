import { TestBed } from '@angular/core/testing';

import { UbigeoDataRequestService } from './ubigeo-data-request.service';

describe('UbigeoDataRequestService', () => {
  let service: UbigeoDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbigeoDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
