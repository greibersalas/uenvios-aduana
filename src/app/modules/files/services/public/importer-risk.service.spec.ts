import { TestBed } from '@angular/core/testing';

import { ImporterRiskService } from './importer-risk.service';

describe('ImporterRiskService', () => {
  let service: ImporterRiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImporterRiskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
