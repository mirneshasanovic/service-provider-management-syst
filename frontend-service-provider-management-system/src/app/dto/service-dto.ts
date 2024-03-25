export class ServiceDTO {
    id: number;
    serviceDescription: string;
    serviceProviders: string[];
  
    constructor(id: number, serviceDescription: string, serviceProviders: string[]) {
      this.id = id;
      this.serviceDescription = serviceDescription;
      this.serviceProviders = serviceProviders;
    }
  }
  