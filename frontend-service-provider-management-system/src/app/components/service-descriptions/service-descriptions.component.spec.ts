import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDescriptionsComponent } from './service-descriptions.component';

describe('ServiceDescriptionsComponent', () => {
  let component: ServiceDescriptionsComponent;
  let fixture: ComponentFixture<ServiceDescriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceDescriptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceDescriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
