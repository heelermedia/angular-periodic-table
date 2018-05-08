import { TestBed, inject } from '@angular/core/testing';

import { ElementsService } from './elements.service';

describe('ElementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementsService]
    });
  });

  it('should be created', inject([ElementsService], (service: ElementsService) => {
    expect(service).toBeTruthy();
  }));
});
