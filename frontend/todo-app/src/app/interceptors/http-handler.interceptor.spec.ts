import { TestBed } from '@angular/core/testing';

import { HttpHandlerInterceptor } from './http-handler.interceptor';

describe('HttpHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpHandlerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpHandlerInterceptor = TestBed.inject(HttpHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
