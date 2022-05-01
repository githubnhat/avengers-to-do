import { TestBed } from '@angular/core/testing';

import { HandleMessageService } from './handle-message.service';

describe('HandleMessageService', () => {
  let service: HandleMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
