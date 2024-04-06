import { TestBed } from '@angular/core/testing';

import { AvaterupdateService } from './avaterupdate.service';

describe('AvaterupdateService', () => {
  let service: AvaterupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaterupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
