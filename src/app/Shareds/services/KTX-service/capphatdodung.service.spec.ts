import { TestBed } from '@angular/core/testing';

import { CapphatdodungService } from './capphatdodung.service';

describe('CapphatdodungService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CapphatdodungService = TestBed.get(CapphatdodungService);
    expect(service).toBeTruthy();
  });
});
