import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../../services/service-provider.service';
import { ServiceProviderDTO } from '../../dto/service-provider-dto';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-service-providers',
  templateUrl: './service-providers.component.html',
  styleUrls: ['./service-providers.component.css']
})
export class ServiceProvidersComponent implements OnInit {

  deleteSuccessMessage: string = '';
  private readonly MESSAGE_TIMEOUT: number = 3000;
  searchTerm: string = '';
  selectedFilter: string = 'allProviders';
  providerDTOs!: ServiceProviderDTO[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  currentFilter: string = 'allProviders';
  currentSearchTerm: string = '';
  errorMessage: string = '';

  constructor(private serviceProviderService: ServiceProviderService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.selectedFilter = '';
    this.getFilteredProviders();
  }

  getAllProviders(): void {
    this.serviceProviderService.getAllProviders(this.currentPage, this.pageSize)
      .subscribe(
        (response: any) => {
          this.providerDTOs = response.content;
          this.totalPages = response.totalPages;
        },
        (error) => {
          console.error('Error getting all service providers:', error);
        }
      );
  }

  deleteProvider(id: number, providerName: string): void {
    this.serviceProviderService.deleteProvider(id)
      .subscribe({
        next: () => {
          this.getFilteredProviders();
          this.deleteSuccessMessage = `Provider "${providerName}" successfully deleted!`;
          setTimeout(() => {
            this.deleteSuccessMessage = '';
          }, this.MESSAGE_TIMEOUT);
        },
        error: error => {
          console.error('Error deleting provider:', error);
        }
      });
  }

  search(): void {
    if (this.selectedFilter === 'allProviders') {
      this.searchTerm = '';
    }
    this.currentPage = 0;
    this.currentSearchTerm = this.searchTerm;
    this.getFilteredProviders(this.currentSearchTerm, this.selectedFilter);
  }

  searchByProvider(providerName: string, offset: number = 0, size: number = this.pageSize): void {
    this.serviceProviderService.searchByProvider(providerName, offset, size)
      .subscribe({
        next: (response: any) => {
          this.ngZone.run(() => {
            this.providerDTOs = response.content;
            this.totalPages = response.totalPages;
          });
        },
        error: (error) => {
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }

  updateCurrentFilter(): void {
    this.currentFilter = this.selectedFilter;
    if (this.selectedFilter === 'allProviders') {
      this.getAllProviders();
      this.searchTerm = '';
    } else {
      this.search();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.getFilteredProviders(this.searchTerm, this.selectedFilter);
    }
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.getFilteredProviders(this.searchTerm, this.selectedFilter);
    }
  }

  getFilteredProviders(searchTerm: string = this.searchTerm, filter: string = this.selectedFilter): void {
    const offset = this.currentPage;
    if (filter === 'providers') {
      this.searchByProvider(searchTerm, offset, this.pageSize);
    } else {
      this.searchByDescription(searchTerm, offset, this.pageSize);
    }
  }

  searchByDescription(description: string, offset: number = 0, size: number = this.pageSize): void {
    this.serviceProviderService.searchByDescription(description, offset, size)
      .subscribe({
        next: (response: any) => {
          this.ngZone.run(() => {
            this.providerDTOs = response.content;
            this.totalPages = response.totalPages;
          });
        },
        error: (error) => {
          this.errorMessage = error;
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        }
      });
  }

  generatePageArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.getFilteredProviders(this.searchTerm, this.selectedFilter);
    }
  }

  hasPreviousPage(): boolean {
    return this.currentPage >= 1;
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }
}
