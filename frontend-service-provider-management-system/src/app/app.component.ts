import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-service-provider-management-system';
  isHomePage(): boolean {
    return this.router.url === '/';
  }

  constructor(private router: Router) { }

}

