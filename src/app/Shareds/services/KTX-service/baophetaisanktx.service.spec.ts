import { TestBed } from '@angular/core/testing';

import { BaophetaisanktxService } from './baophetaisanktx.service';

describe('BaophetaisanktxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaophetaisanktxService = TestBed.get(BaophetaisanktxService);
    expect(service).toBeTruthy();
  });
});
