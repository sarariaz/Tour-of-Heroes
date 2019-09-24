import { TestBed } from '@angular/core/testing';

import { CostumesService } from './costumes.service';

describe('CostumesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostumesService = TestBed.get(CostumesService);
    expect(service).toBeTruthy();
  });
});
