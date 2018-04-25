import { TestBed, inject } from '@angular/core/testing';

import { ConnectionService } from '@app/connections/services/connection.service';

describe('ConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionService],
    });
  });

  it(
    'should be created',
    inject([ConnectionService], (service: ConnectionService) => {
      expect(service).toBeTruthy();
    })
  );
});
