import { TestBed } from '@angular/core/testing';

import { QuytrinhvaoraService } from './quytrinhvaora.service';

describe('QuytrinhvaoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuytrinhvaoraService = TestBed.get(QuytrinhvaoraService);
    expect(service).toBeTruthy();
  });
});
