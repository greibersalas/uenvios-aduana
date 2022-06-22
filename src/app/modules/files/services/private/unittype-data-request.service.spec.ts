import { TestBed } from '@angular/core/testing';

import { UnittypeDataRequestService } from './unittype-data-request.service';

describe('UnittypeDataRequestService', () => {
  let service: UnittypeDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnittypeDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
