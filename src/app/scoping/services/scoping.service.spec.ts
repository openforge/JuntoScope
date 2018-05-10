import { TestBed, inject } from '@angular/core/testing';

import { ScopingService } from '@app/scoping/services/scoping.service';

describe('ScopingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScopingService],
    });
  });

  it(
    'should be created',
    inject([ScopingService], (service: ScopingService) => {
      expect(service).toBeTruthy();
    })
  );
});
