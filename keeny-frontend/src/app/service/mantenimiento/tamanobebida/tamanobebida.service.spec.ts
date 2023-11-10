import { TestBed } from '@angular/core/testing';

import { TamanobebidaService } from './tamanobebida.service';

describe('TamanobebidaService', () => {
  let service: TamanobebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamanobebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
