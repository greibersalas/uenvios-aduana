import { TestBed } from '@angular/core/testing';

import { CustomsService } from './customs.service';

describe('CustomsService', () => {
  let service: CustomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
