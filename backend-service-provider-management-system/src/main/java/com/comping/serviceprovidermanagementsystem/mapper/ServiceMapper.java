package com.comping.serviceprovidermanagementsystem.mapper;

import com.comping.serviceprovidermanagementsystem.dto.ServiceDTO;
import com.comping.serviceprovidermanagementsystem.entity.Service;
import com.comping.serviceprovidermanagementsystem.entity.ServiceProvider;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class ServiceMapper {

    public ServiceDTO mapToServiceDTO(Service service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setServiceDescription(service.getServiceDescription());

        List<String> serviceProviders = null;
        if (service.getServiceProviders() != null) {
            serviceProviders = service.getServiceProviders().stream()
                    .map(ServiceProvider::getServiceName)
                    .distinct()
                    .collect(Collectors.toList());
        }
        dto.setServiceProviders(serviceProviders);
        return dto;
    }
}
