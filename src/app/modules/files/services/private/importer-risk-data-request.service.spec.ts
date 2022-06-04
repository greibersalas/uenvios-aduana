import { TestBed } from '@angular/core/testing';

import { ImporterRiskDataRequestService } from './importer-risk-data-request.service';

describe('ImporterRiskDataRequestService', () => {
  let service: ImporterRiskDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImporterRiskDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
