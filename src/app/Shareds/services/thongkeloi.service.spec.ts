import { TestBed } from '@angular/core/testing';

import { ThongkeloiService } from './thongkeloi.service';

describe('ThongkeloiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThongkeloiService = TestBed.get(ThongkeloiService);
    expect(service).toBeTruthy();
  });
});
