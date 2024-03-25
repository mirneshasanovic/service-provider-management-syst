import { Component } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { ServiceDTO } from '../../dto/service-dto';
import { NgForm } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {
  newService: ServiceDTO = {
    serviceDescription: '',
    serviceProviders: [],
    id: 0
  };
  successMessage: string = '';
  private readonly MESSAGE_TIMEOUT: number = 3000;
  errorMessage!: string[];
  submitted: boolean = false;
  showErrorMessage: boolean = false;

  constructor(private serviceService: ServiceService) { }

  onSubmit(form: NgForm): void {
    let serviceProvidersString = '';
    this.showErrorMessage = false;
    const validCharactersRegex = /^[a-zA-Z0-9,\s]+$/;
    const controlNames: { [key: string]: string } = {
      serviceProviders: 'Service Providers',
      serviceDescription: 'Service Description',
    };

    if (form.invalid) {
      const invalidControls = Object.keys(form.controls).filter(key => form.controls[key].invalid);
      this.errorMessage = invalidControls.map(control => `The <b>${controlNames[control]}</b> field is required.`);
      this.showErrorMessage = true;
      return;
    }

    if (Array.isArray(this.newService.serviceProviders)) {
      serviceProvidersString = this.newService.serviceProviders.join(',');
    } else if (typeof this.newService.serviceProviders === 'string') {
      serviceProvidersString = this.newService.serviceProviders;
    }

    if (!validCharactersRegex.test(serviceProvidersString)) {
      this.errorMessage = [`The <strong>Service Providers</strong> field contains invalid characters.`];
      this.showErrorMessage = true;
      return;
    }

    const requestData = {
      serviceDescription: this.newService.serviceDescription,
      serviceProviders: serviceProvidersString.split(',').map(provider => provider.trim())
    };

    this.serviceService.addService(requestData)
      .pipe(
        catchError(error => {
          console.error('Error adding service:', error);
          throw error;
        })
      )
      .subscribe(response => {
        console.log('Service added successfully:', response);
        this.newService = {
          serviceDescription: '',
          serviceProviders: [],
          id: 0
        };
        this.successMessage = `Successfully added new service: <strong>${requestData.serviceDescription}</strong> and assigned it to providers: <strong>${requestData.serviceProviders.join('</strong>, <strong>')}</strong>`;
        setTimeout(() => {
          this.successMessage = '';
        }, this.MESSAGE_TIMEOUT);
      });
  }
}