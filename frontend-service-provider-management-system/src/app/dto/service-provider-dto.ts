export class ServiceProviderDTO {
    id: number;
    serviceName: string;
    services: string[];
  
    constructor(id: number, serviceName: string, services: string[]) {
      this.id = id;
      this.serviceName = serviceName;
      this.services = services;
    }
  }
  