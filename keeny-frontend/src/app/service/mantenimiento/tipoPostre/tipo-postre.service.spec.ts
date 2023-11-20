import { TestBed } from '@angular/core/testing';

import { TipoPostreService } from './tipo-postre.service';

describe('TipoPostreService', () => {
  let service: TipoPostreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPostreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
