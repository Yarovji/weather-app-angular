import { TestBed } from '@angular/core/testing';

import { WeatherSService } from './search-city.service';

describe('WeatherSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherSService = TestBed.get(WeatherSService);
    expect(service).toBeTruthy();
  });
});
