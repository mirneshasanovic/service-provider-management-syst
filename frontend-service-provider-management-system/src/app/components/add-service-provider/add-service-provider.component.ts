import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceProviderService } from '../../services/service-provider.service';
import { ServiceProviderDTO } from '../../dto/service-provider-dto';

@Component({
  selector: 'app-add-service-provider',
  templateUrl: './add-service-provider.component.html',
  styleUrls: ['./add-service-provider.component.css']
})
export class AddServiceProviderComponent {
  newService: ServiceProviderDTO = {
    serviceName: '',
    services: [],
    id: 0
  };
  successMessage: string = '';
  private readonly MESSAGE_TIMEOUT: number = 3000;
  errorMessage!: string[];
  submitted: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private serviceProviderService: ServiceProviderService) { }

  onSubmit(form: NgForm): void {
    let serviceProvidersString = '';
    this.submitted = true;
    this.showErrorMessage = false;
    const validCharactersRegex = /^[a-zA-Z0-9,\s]+$/;

    if (form.invalid) {
      const invalidControls = Object.keys(form.controls).filter(key => form.controls[key].invalid);
      this.errorMessage = invalidControls.map(control => `The <strong>${control}<strong> field is required.`);
      this.showErrorMessage = true;
      return;
    }

    if (Array.isArray(this.newService.services)) {
      serviceProvidersString = this.newService.services.join(',');
    } else if (typeof this.newService.serviceName === 'string') {
      serviceProvidersString = this.newService.services;
    }

    if (!validCharactersRegex.test(serviceProvidersString)) {
      this.errorMessage = [`The <strong>Service Providers</strong> field contains invalid characters.`];
      this.showErrorMessage = true;
      return;
    }

    const requestData = {
      serviceName: this.newService.serviceName,
      services: serviceProvidersString.split(',').map(provider => provider.trim())
    };

    this.serviceProviderService.addProvider(requestData)
      .subscribe({
        next: response => {
          console.log('Service added successfully:', response);
          this.errorMessage = [];
          this.newService = {
            serviceName: '',
            services: [],
            id: 0
          };
          this.successMessage = `Successfully added new service provider: <strong>${requestData.serviceName}</strong> and assigned it to services: <strong>${requestData.services.join('</strong>, <strong>')}</strong>`;
          setTimeout(() => {
            this.successMessage = '';
          }, this.MESSAGE_TIMEOUT);
          this.errorMessage = [];
        },
        error: error => {
          console.error('Error adding service:', error);
        }
      });
  }
}
