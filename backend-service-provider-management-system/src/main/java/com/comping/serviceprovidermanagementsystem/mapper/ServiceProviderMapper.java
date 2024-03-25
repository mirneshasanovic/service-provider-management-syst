package com.comping.serviceprovidermanagementsystem.mapper;

import com.comping.serviceprovidermanagementsystem.dto.ServiceProviderDTO;
import com.comping.serviceprovidermanagementsystem.entity.Service;
import com.comping.serviceprovidermanagementsystem.entity.ServiceProvider;

import java.util.List;
import java.util.stream.Collectors;


@org.springframework.stereotype.Service
public class ServiceProviderMapper {

    public ServiceProviderDTO mapToServiceProviderDTO(ServiceProvider serviceProvider) {
        ServiceProviderDTO dto = new ServiceProviderDTO();
        dto.setId(serviceProvider.getId());
        dto.setServiceName(serviceProvider.getServiceName());
        List<String> serviceDescriptions = serviceProvider.getServices().stream()
                .map(Service::getServiceDescription)
                .distinct()
                .collect(Collectors.toList());
        dto.setServices(serviceDescriptions);
        return dto;
    }
}