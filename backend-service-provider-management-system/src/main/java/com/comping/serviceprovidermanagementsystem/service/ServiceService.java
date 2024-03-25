package com.comping.serviceprovidermanagementsystem.service;

import com.comping.serviceprovidermanagementsystem.dto.ServiceDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ServiceService {
    Page<ServiceDTO> getAllServices(String provider, String description, int page, int size);
    Page<ServiceDTO> getAllServices(Pageable pageable);
    ServiceDTO getServiceById(Long id);
    void deleteServiceById(Long id);
    ServiceDTO addService(ServiceDTO serviceDTO);
    ServiceDTO updateService(Long id, ServiceDTO serviceDTO);
    Page<ServiceDTO> searchByProvider(String provider, Pageable pageable);
    Page<ServiceDTO> searchByDescription(String description, Pageable pageable);
    void validateServiceProviders(List<String> serviceProviders);
    Page<String> getAllServiceDescriptions(int page, int size);
}
