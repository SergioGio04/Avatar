import { TestBed } from '@angular/core/testing';

import { ServiceFirebase2Service } from './service-firebase2.service';

describe('ServiceFirebase2Service', () => {
  let service: ServiceFirebase2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFirebase2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
