import { TestBed } from '@angular/core/testing';

import { CategoriabebidaService } from './categoriabebida.service';

describe('CategoriabebidaService', () => {
  let service: CategoriabebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriabebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
