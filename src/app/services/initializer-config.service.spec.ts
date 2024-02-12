import { TestBed } from '@angular/core/testing';

import { InitializerConfigService } from './initializer-config.service';

describe('InitializerConfigService', () => {
  let service: InitializerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitializerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
