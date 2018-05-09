import { TestBed, inject } from '@angular/core/testing';

import { PeriodicDataModelService } from './periodic-data-model.service';

describe('PeriodicDataModelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeriodicDataModelService]
    });
  });

  it('should be created', inject([PeriodicDataModelService], (service: PeriodicDataModelService) => {
    expect(service).toBeTruthy();
  }));
});
