import { TestBed } from '@angular/core/testing';

import { ServiceDescriptionsService } from './service-descriptions.service';

describe('ServiceDescriptionsService', () => {
  let service: ServiceDescriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDescriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
