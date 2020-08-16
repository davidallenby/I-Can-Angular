import { TestBed } from '@angular/core/testing';

import { OwnerService } from './owner.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OwnerService', () => {
  let service: OwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OwnerService]
    });
    service = TestBed.inject(OwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
