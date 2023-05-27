import { TestBed } from '@angular/core/testing';

import { ReplaceserviceService } from './replaceservice.service';

describe('ReplaceserviceService', () => {
  let service: ReplaceserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplaceserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
