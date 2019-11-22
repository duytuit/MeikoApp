import { TestBed } from '@angular/core/testing';

import { TieusunhanvienService } from './tieusunhanvien.service';

describe('TieusunhanvienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TieusunhanvienService = TestBed.get(TieusunhanvienService);
    expect(service).toBeTruthy();
  });
});
