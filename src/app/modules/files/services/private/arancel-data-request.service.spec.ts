import { TestBed } from '@angular/core/testing';

import { ArancelDataRequestService } from './arancel-data-request.service';

describe('ArancelDataRequestService', () => {
  let service: ArancelDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArancelDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
