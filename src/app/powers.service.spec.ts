import { TestBed } from '@angular/core/testing';

import { PowersService } from './powers.service';

describe('PowersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PowersService = TestBed.get(PowersService);
    expect(service).toBeTruthy();
  });
});
