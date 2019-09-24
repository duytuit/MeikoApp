import { TestBed } from '@angular/core/testing';

import { Thongkeloima5Service } from './thongkeloima5.service';

describe('Thongkeloima5Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Thongkeloima5Service = TestBed.get(Thongkeloima5Service);
    expect(service).toBeTruthy();
  });
});
