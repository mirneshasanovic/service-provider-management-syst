package com.comping.serviceprovidermanagementsystem.service;

import com.comping.serviceprovidermanagementsystem.entity.ServiceProvider;
import com.comping.serviceprovidermanagementsystem.exception.ResourceNotFoundException;
import com.comping.serviceprovidermanagementsystem.mapper.ServiceMapper;
import com.comping.serviceprovidermanagementsystem.dto.ServiceDTO;
import com.comping.serviceprovidermanagementsystem.entity.Service;
import com.comping.serviceprovidermanagementsystem.repository.ServiceProviderRepository;
import com.comping.serviceprovidermanagementsystem.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    private final ServiceRepository serviceRepository;
    private final ServiceProviderRepository serviceProviderRepository;
    private final ServiceMapper serviceMapper;

    @Autowired
    public ServiceServiceImpl(ServiceRepository serviceRepository, ServiceMapper serviceMapper, ServiceProviderRepository serviceProviderRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceMapper = serviceMapper;
        this.serviceProviderRepository = serviceProviderRepository;
    }

    @Override
    public Page<ServiceDTO> getAllServices(String provider, String description, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (provider != null && !provider.isEmpty()) {
            return searchByProvider(provider, pageable);
        } else if (description != null) {
            return searchByDescription(description, pageable);
        } else {
            return getAllServices(pageable);
        }
    }

    @Override
    public Page<ServiceDTO> getAllServices(Pageable pageable) {
        Page<Service> servicePage = serviceRepository.findAll(pageable);
        if (servicePage.isEmpty()) {
            throw new ResourceNotFoundException("There are no services in the database.", "SERVICES");
        }
        return servicePage.map(serviceMapper::mapToServiceDTO);
    }

    @Override
    public ServiceDTO getServiceById(Long id) {

        Service service = serviceRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Service", "id", String.valueOf(id), "SERVICE")
        );
        return serviceMapper.mapToServiceDTO(service);
    }

    @Override
    public void deleteServiceById(Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", String.valueOf(id), "SERVICE"));
        for (ServiceProvider serviceProvider : service.getServiceProviders()) {
            serviceProvider.getServices().remove(service);
        }
        serviceRepository.deleteById(id);
    }

    @Override
    public ServiceDTO addService(ServiceDTO serviceDTO) {
        Service service = new Service(serviceDTO.getServiceDescription());
        service.setServiceProviders(new HashSet<>());

        if (serviceDTO.getServiceProviders() != null) {
            for (String serviceProviderName : serviceDTO.getServiceProviders()) {
                if (!serviceProviderName.isEmpty()) {
                    ServiceProvider serviceProvider = serviceProviderRepository.findByServiceName(serviceProviderName);
                    if (serviceProvider == null) {
                        serviceProvider = new ServiceProvider(serviceProviderName);
                        serviceProvider.setServices(new HashSet<>());
                        serviceProviderRepository.save(serviceProvider);
                    }
                    service.getServiceProviders().add(serviceProvider);
                    serviceProvider.getServices().add(service);
                }
            }
        }

        Service savedService = serviceRepository.save(service);
        return serviceMapper.mapToServiceDTO(savedService);
    }

    @Override
    public ServiceDTO updateService(Long id, ServiceDTO serviceDTO) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service", "id", String.valueOf(id), "SERVICE"));

        service.setServiceDescription(serviceDTO.getServiceDescription());

        for (ServiceProvider serviceProvider : service.getServiceProviders()) {
            serviceProvider.getServices().remove(service);
        }
        service.getServiceProviders().clear();

        if (serviceDTO.getServiceProviders() != null) {
            for (String serviceProviderName : serviceDTO.getServiceProviders()) {
                ServiceProvider serviceProvider = serviceProviderRepository.findByServiceName(serviceProviderName);
                if (serviceProvider == null) {
                    serviceProvider = new ServiceProvider(serviceProviderName);
                    serviceProviderRepository.save(serviceProvider);
                }
                service.getServiceProviders().add(serviceProvider);
                serviceProvider.getServices().add(service);
            }
        }
        Service savedService = serviceRepository.save(service);
        return serviceMapper.mapToServiceDTO(savedService);
    }

    @Override
    public Page<ServiceDTO> searchByProvider(String provider, Pageable pageable) {
        Page<Service> servicePage = serviceRepository.findByServiceProviders_ServiceNameContaining(provider, pageable);
        if (servicePage.isEmpty()) {
            throw new ResourceNotFoundException("Service", "provider", provider, "SERVICE");
        }
        return servicePage.map(serviceMapper::mapToServiceDTO);
    }

    @Override
    public Page<ServiceDTO> searchByDescription(String description, Pageable pageable) {
        Page<Service> servicePage = serviceRepository.findByServiceDescriptionContaining(description, pageable);
        if (servicePage.isEmpty()) {
            throw new ResourceNotFoundException("Service", "description", description, "SERVICE");
        }
        return servicePage.map(serviceMapper::mapToServiceDTO);
    }
    @Override
    public Page<String> getAllServiceDescriptions(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return serviceRepository.findAllDescriptions(pageable);
    }

    @Override
    public void validateServiceProviders(List<String> serviceProviders) {
        for (String serviceProviderName : serviceProviders) {
            if (!serviceProviderName.matches("^[a-zA-Z0-9 ]*$") || serviceProviderName.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Service providers contain invalid characters.");
            }
        }
    }
}