import { TestBed } from '@angular/core/testing';

import { ServiceTemaService } from './service-tema.service';

describe('ServiceTemaService', () => {
  let service: ServiceTemaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTemaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
