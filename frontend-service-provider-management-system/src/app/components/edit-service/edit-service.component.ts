import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ServiceDTO } from '../../dto/service-dto';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent {
  serviceId!: number;
  serviceDescription!: string;
  serviceProviders!: string;
  successMessage: string = '';
  private readonly MESSAGE_TIMEOUT: number = 3000;
  formSubmitted: boolean = false;


  constructor(private route: ActivatedRoute, private serviceService: ServiceService) {
    this.route.params.subscribe(params => {
      this.serviceId = +params['id'];
      this.getServiceDetails(this.serviceId);
    });
  }

  getServiceDetails(id: number) {
    this.serviceService.getServiceById(id).subscribe((data: ServiceDTO) => {
      this.serviceDescription = data.serviceDescription;
      this.serviceProviders = data.serviceProviders.join(', ');
    });
  }

  updateService() {
    this.formSubmitted = true;
    if (!this.serviceDescription || !this.serviceProviders) {
      return;
    }
    const updatedService: Partial<ServiceDTO> = {
      serviceDescription: this.serviceDescription,
      serviceProviders: this.serviceProviders.split(',').map(provider => provider.trim())
    };

    this.serviceService.updateService(this.serviceId, updatedService).subscribe((data: any) => {
      console.log('Service updated successfully');
      this.successMessage = `Successfully updated service: <strong>${data.serviceDescription}</strong>`;
      setTimeout(() => {
        this.successMessage = '';
      }, this.MESSAGE_TIMEOUT);
    });
  }
}
