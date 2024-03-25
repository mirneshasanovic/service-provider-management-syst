package com.comping.serviceprovidermanagementsystem.service;

import com.comping.serviceprovidermanagementsystem.dto.ServiceProviderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ServiceProviderService {
    Page<ServiceProviderDTO> getAllProviders(String provider, String service, int page, int size);

    ServiceProviderDTO getServiceProviderById(Long id);

    void deleteServiceProviderById(Long id);

    ServiceProviderDTO addServiceProvider(ServiceProviderDTO serviceProviderDTO);

    ServiceProviderDTO updateServiceProvider(Long id, ServiceProviderDTO serviceProviderDTO);

    Page<ServiceProviderDTO> searchByProvider(String providerName, Pageable pageable);

    Page<ServiceProviderDTO> searchByService(String serviceName, Pageable pageable);

    Page<ServiceProviderDTO> getAllProviders(Pageable pageable);

    void validateServices(List<String> services);
}
