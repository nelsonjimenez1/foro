import { TestBed } from '@angular/core/testing';

import { ServiceForoService } from './service-foro.service';

describe('ServiceForoService', () => {
  let service: ServiceForoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceForoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
