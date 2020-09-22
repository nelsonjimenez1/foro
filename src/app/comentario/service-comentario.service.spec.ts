import { TestBed } from '@angular/core/testing';

import { ServiceComentarioService } from './service-comentario.service';

describe('ServiceComentarioService', () => {
  let service: ServiceComentarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceComentarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
