import { TestBed } from '@angular/core/testing';

import { ExercisesServicesService } from './exercises-services.service';

describe('ExercisesServicesService', () => {
  let service: ExercisesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
