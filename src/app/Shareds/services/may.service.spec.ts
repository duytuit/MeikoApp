import { TestBed } from '@angular/core/testing';

import { MayService } from './may.service';

describe('MayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MayService = TestBed.get(MayService);
    expect(service).toBeTruthy();
  });
});
