import { TestBed } from '@angular/core/testing';

import { KypoUserAndGroupApiService } from './kypo-user-and-group-api.service';

describe('KypoUserAndGroupApiService', () => {
  let service: KypoUserAndGroupApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KypoUserAndGroupApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
