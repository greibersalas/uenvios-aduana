import { TestBed } from '@angular/core/testing';

import { DocumenttypeDataRequestService } from './documenttype-data-request.service';

describe('DocumenttypeDataRequestService', () => {
  let service: DocumenttypeDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumenttypeDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
