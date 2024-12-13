import { TestBed } from '@angular/core/testing';

import { CallingAPIBackEndService } from './calling-apiback-end.service';

describe('CallingAPIBackEndService', () => {
  let service: CallingAPIBackEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallingAPIBackEndService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
