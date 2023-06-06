import { TestBed } from '@angular/core/testing';

import { FixedMovementService } from './fixedMovement.service';

describe('InsightsService', () => {
  let service: FixedMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
