import { TestBed, inject } from '@angular/core/testing';

import { ConnectionsService } from '@app/connections/services/connections.service';

describe('ConnectionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionsService],
    });
  });

  it(
    'should be created',
    inject([ConnectionsService], (service: ConnectionsService) => {
      expect(service).toBeTruthy();
    })
  );
});
