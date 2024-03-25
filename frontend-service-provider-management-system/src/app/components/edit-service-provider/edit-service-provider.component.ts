import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceProviderService } from '../../services/service-provider.service';
import { ServiceProviderDTO } from '../../dto/service-provider-dto';

@Component({
  selector: 'app-edit-service-provider',
  templateUrl: './edit-service-provider.component.html',
  styleUrls: ['./edit-service-provider.component.css']
})
export class EditServiceProviderComponent {
  providerId!: number;
  providerName!: string;
  serviceNames!: string;
  successMessage: string = '';
  private readonly MESSAGE_TIMEOUT: number = 3000;
  formSubmitted: boolean = false;

  constructor(private route: ActivatedRoute, private serviceProviderService: ServiceProviderService) {
    this.route.params.subscribe(params => {
      this.providerId = +params['id'];
      this.getServiceProviderDetails(this.providerId);
    });
  }

  getServiceProviderDetails(id: number) {
    this.serviceProviderService.getServiceProviderById(id).subscribe((data: ServiceProviderDTO) => {
      this.providerName = data.serviceName;
      this.serviceNames = data.services.join(', ');
    });
  }

  updateServiceProvider() {
    this.formSubmitted = true;
    if (!this.providerName || !this.serviceNames) {
      return;
    }
    const updatedProvider: Partial<ServiceProviderDTO> = {
      serviceName: this.providerName,
      services: this.serviceNames.split(',').map(serviceNames => serviceNames.trim())
    };

    this.serviceProviderService.updateServiceProvider(this.providerId, updatedProvider).subscribe((data: any) => {
      console.log('Service provider updated successfully');
      this.successMessage = `Successfully updated service provider: <strong>${data.serviceName}</strong>`;
      setTimeout(() => {
        this.successMessage = '';
      }, this.MESSAGE_TIMEOUT);
    });
  }
}
