import { Component } from '@angular/core';
import { ServiceDescriptionsService } from '../../services/service-descriptions.service';

@Component({
  selector: 'app-service-descriptions',
  templateUrl: './service-descriptions.component.html',
  styleUrl: './service-descriptions.component.css'
})
export class ServiceDescriptionsComponent {

  descriptions: string[] = [];
  page = 0;
  size = 10;
  currentPage = 0;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor(private serviceDescriptionsService: ServiceDescriptionsService) { }

  ngOnInit(): void {
    this.getAllServiceDescriptions();
  }

  getAllServiceDescriptions(): void {
    this.serviceDescriptionsService.getAllServiceDescriptions(this.currentPage, 10)
      .subscribe(response => {
        this.descriptions = response.descriptions;
        this.totalPages = response.totalPages;
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i);
      });
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllServiceDescriptions();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllServiceDescriptions();
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getAllServiceDescriptions();
  }
}
