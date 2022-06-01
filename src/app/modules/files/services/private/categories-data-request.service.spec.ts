import { TestBed } from '@angular/core/testing';

import { CategoriesDataRequestService } from './categories-data-request.service';

describe('CategoriesDataRequestService', () => {
  let service: CategoriesDataRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesDataRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
