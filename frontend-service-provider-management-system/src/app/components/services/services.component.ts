import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ServiceDTO } from '../../dto/service-dto';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  deleteSuccessMessage: string = '';
  private readonly MESSAGE_TIMEOUT: number = 3000;
  descriptionSearchTerm: string = '';
  providerSearchTerm: string = '';
  selectedFilter: string = 'allServices';
  searchTerm: string = '';
  currentSearchTerm: string = '';
  currentFilter: string = 'providers';

  serviceDTOs!: ServiceDTO[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage: string = '';

  constructor(private serviceService: ServiceService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.selectedFilter = '';
    this.getFilteredServices();
  }

  getAllServices(): void {
    this.serviceService.getAllServices(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: any) => {
          this.serviceDTOs = response.content;
          this.totalPages = response.totalPages;
        },
        error: (error) => {
          console.error('Error getting all services:', error);
        }
      });
  }

  deleteService(id: number, serviceName: string): void {
    this.serviceService.deleteService(id)
      .subscribe({
        next: () => {
          this.getFilteredServices();
          this.deleteSuccessMessage = `Service "${serviceName}" successfully deleted!`;
          setTimeout(() => {
            this.deleteSuccessMessage = '';
          }, this.MESSAGE_TIMEOUT);
        },
        error: error => {
          console.error('Error deleting service:', error);
        }
      });
  }

  search(): void {
    if (this.selectedFilter === 'allServices') {
      this.searchTerm = '';
    }
    this.currentPage = 0;
    this.currentSearchTerm = this.searchTerm;
    this.getFilteredServices(this.currentSearchTerm, this.selectedFilter);
  }

  searchByDescription(description: string, offset: number = 0, size: number = this.pageSize): void {
    this.serviceService.searchByDescription(description, offset, size)
      .subscribe({
        next: (response: any) => {
          this.ngZone.run(() => {
            this.serviceDTOs = response.content;
            this.totalPages = response.totalPages;
          });
        },
        error: (error) => {
          console.error('Error searching services by description:', error);
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }



  searchByProvider(provider: string, offset: number = 0, size: number = this.pageSize): void {
    this.serviceService.searchByProvider(provider, offset, size)
      .subscribe({
        next: (response: any) => {
          this.ngZone.run(() => {
            this.serviceDTOs = response.content;
            this.totalPages = response.totalPages;
          });
        },
        error: (error) => {
          console.error('Error searching services by provider:', error);
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }

  updateCurrentFilter(): void {
    this.currentFilter = this.selectedFilter;
    if (this.selectedFilter === 'allServices') {
      this.getAllServices();
      this.searchTerm = '';
    } else {
      this.search();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.getFilteredServices(this.currentSearchTerm, this.currentFilter);
    }
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.getFilteredServices(this.currentSearchTerm, this.currentFilter);
    }
  }

  getFilteredServices(searchTerm: string = this.currentSearchTerm, filter: string = this.currentFilter): void {
    const offset = this.currentPage;
    if (filter === 'providers') {
      this.searchByProvider(searchTerm, offset, this.pageSize);
    } else {
      this.searchByDescription(searchTerm, offset, this.pageSize);
    }
  }


  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getFilteredServices(this.currentSearchTerm, this.selectedFilter);
    }
  }

  hasPreviousPage(): boolean {
    return this.currentPage >= 1;
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }
}
