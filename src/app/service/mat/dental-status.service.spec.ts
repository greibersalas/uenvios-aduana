import { TestBed } from '@angular/core/testing';

import { DentalStatusService } from './dental-status.service';

describe('DentalStatusService', () => {
  let service: DentalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DentalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
