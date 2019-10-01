import { TestBed } from '@angular/core/testing';

import { Thongkeloima5v1Service } from './thongkeloima5v1.service';

describe('Thongkeloima5v1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Thongkeloima5v1Service = TestBed.get(Thongkeloima5v1Service);
    expect(service).toBeTruthy();
  });
});
