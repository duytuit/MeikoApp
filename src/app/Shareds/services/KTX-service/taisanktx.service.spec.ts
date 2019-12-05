import { TestBed } from '@angular/core/testing';

import { TaisanktxService } from './taisanktx.service';

describe('TaisanktxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaisanktxService = TestBed.get(TaisanktxService);
    expect(service).toBeTruthy();
  });
});
