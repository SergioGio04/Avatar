import { TestBed } from '@angular/core/testing';

import { FirebaseManagerService } from './firebase-manager.service';

describe('FirebaseManagerService', () => {
  let service: FirebaseManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
