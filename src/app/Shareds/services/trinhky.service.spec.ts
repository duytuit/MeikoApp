import { TestBed } from '@angular/core/testing';

import { TrinhkyService } from './trinhky.service';

describe('TrinhkyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrinhkyService = TestBed.get(TrinhkyService);
    expect(service).toBeTruthy();
  });
});
