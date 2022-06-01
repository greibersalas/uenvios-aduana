import { TestBed } from '@angular/core/testing';

import { CountryDataRequestService } from './country-data-request.service';

describe('CountryDataRequestService', () => {
  let service: CountryDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
