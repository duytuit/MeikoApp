import { TestBed } from '@angular/core/testing';

import { NhaptaisanktxService } from './nhaptaisanktx.service';

describe('NhaptaisanktxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhaptaisanktxService = TestBed.get(NhaptaisanktxService);
    expect(service).toBeTruthy();
  });
});
