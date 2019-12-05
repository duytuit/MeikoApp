import { TestBed } from '@angular/core/testing';

import { PhongktxService } from './phongktx.service';

describe('PhongktxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhongktxService = TestBed.get(PhongktxService);
    expect(service).toBeTruthy();
  });
});
