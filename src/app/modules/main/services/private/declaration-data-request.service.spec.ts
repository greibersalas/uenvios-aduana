import { TestBed } from '@angular/core/testing';

import { DeclarationDataRequestService } from './declaration-data-request.service';

describe('DeclarationDataRequestService', () => {
  let service: DeclarationDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeclarationDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
