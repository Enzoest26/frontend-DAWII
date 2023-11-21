import { TestBed } from '@angular/core/testing';

import { PostreService } from './postre.service';

describe('PostreService', () => {
  let service: PostreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
