import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuComponentComponent } from './navigation-menu-component.component';

describe('NavigationMenuComponentComponent', () => {
  let component: NavigationMenuComponentComponent;
  let fixture: ComponentFixture<NavigationMenuComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationMenuComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigationMenuComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
