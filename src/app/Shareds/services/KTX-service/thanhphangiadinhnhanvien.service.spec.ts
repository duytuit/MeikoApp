import { TestBed } from '@angular/core/testing';

import { ThanhphangiadinhnhanvienService } from './thanhphangiadinhnhanvien.service';

describe('ThanhphangiadinhnhanvienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThanhphangiadinhnhanvienService = TestBed.get(ThanhphangiadinhnhanvienService);
    expect(service).toBeTruthy();
  });
});
