import { TestBed } from '@angular/core/testing';

import { ServiceBase2Service } from './service-base2.service';

describe('ServiceBase2Service', () => {
  let service: ServiceBase2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceBase2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
