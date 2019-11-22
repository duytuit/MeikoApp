import { TestBed } from '@angular/core/testing';

import { NhanviendangkyService } from './nhanviendangky.service';

describe('NhanviendangkyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NhanviendangkyService = TestBed.get(NhanviendangkyService);
    expect(service).toBeTruthy();
  });
});
