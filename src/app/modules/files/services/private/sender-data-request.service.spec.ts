import { TestBed } from '@angular/core/testing';

import { SenderDataRequestService } from './sender-data-request.service';

describe('SenderDataRequestService', () => {
  let service: SenderDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenderDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
