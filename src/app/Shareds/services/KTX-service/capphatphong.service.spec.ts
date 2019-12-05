import { TestBed } from '@angular/core/testing';

import { CapphatphongService } from './capphatphong.service';

describe('CapphatphongService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapphatphongService = TestBed.get(CapphatphongService);
    expect(service).toBeTruthy();
  });
});
