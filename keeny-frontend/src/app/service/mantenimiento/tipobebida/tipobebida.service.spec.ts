import { TestBed } from '@angular/core/testing';

import { TipobebidaService } from './tipobebida.service';

describe('TipobebidaService', () => {
  let service: TipobebidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipobebidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
