package com.comping.serviceprovidermanagementsystem.service;

import com.comping.serviceprovidermanagementsystem.dto.ServiceProviderDTO;
import com.comping.serviceprovidermanagementsystem.entity.Service;
import com.comping.serviceprovidermanagementsystem.entity.ServiceProvider;
import com.comping.serviceprovidermanagementsystem.exception.ResourceNotFoundException;
import com.comping.serviceprovidermanagementsystem.mapper.ServiceProviderMapper;
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
import java.util.Set;

@org.springframework.stereotype.Service
public class ServiceProviderServiceImpl implements ServiceProviderService {

    private final ServiceProviderRepository serviceProviderRepository;
    private final ServiceProviderMapper serviceProviderMapper;
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceProviderServiceImpl(ServiceProviderRepository serviceProviderRepository, ServiceProviderMapper serviceProviderMapper, ServiceRepository serviceRepository) {
        this.serviceProviderRepository = serviceProviderRepository;
        this.serviceProviderMapper = serviceProviderMapper;
        this.serviceRepository = serviceRepository;
    }

    @Override
    public Page<ServiceProviderDTO> getAllProviders(String provider, String service, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        if (provider != null && !provider.isEmpty()) {
            return searchByProvider(provider, pageable);
        } else if (service != null && !service.isEmpty()) {
            return searchByService(service, pageable);
        } else {
            return getAllProviders(pageable);
        }
    }

    @Override
    public ServiceProviderDTO getServiceProviderById(Long id) {
        ServiceProvider serviceProvider = serviceProviderRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Service Provider", "id", String.valueOf(id), "SERVICE_PROVIDER")
        );
        return serviceProviderMapper.mapToServiceProviderDTO(serviceProvider);
    }

    @Override
    public void deleteServiceProviderById(Long id) {
        ServiceProvider serviceProvider = serviceProviderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service Provider", "id", String.valueOf(id), "SERVICE_PROVIDER"));
        for (Service service : serviceProvider.getServices()) {
            service.getServiceProviders().remove(serviceProvider);
        }
        serviceProviderRepository.deleteById(id);
    }

    @Override
    public ServiceProviderDTO addServiceProvider(ServiceProviderDTO serviceProviderDTO) {
        ServiceProvider serviceProvider = new ServiceProvider(serviceProviderDTO.getServiceName());
        Set<Service> services = new HashSet<>();

        if (serviceProviderDTO.getServices() != null) {
            for (String serviceName : serviceProviderDTO.getServices()) {
                Service service = serviceRepository.findByServiceDescription(serviceName);
                if (service == null) {
                    service = new Service(serviceName);
                    serviceRepository.save(service);
                }
                services.add(service);
            }
        }
        serviceProvider.setServices(services);
        ServiceProvider savedServiceProvider = serviceProviderRepository.save(serviceProvider);

        return serviceProviderMapper.mapToServiceProviderDTO(savedServiceProvider);
    }

    @Override
    public ServiceProviderDTO updateServiceProvider(Long id, ServiceProviderDTO serviceProviderDTO) {
        ServiceProvider serviceProvider = serviceProviderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceProvider", "id", String.valueOf(id), "SERVICE_PROVIDER"));

        serviceProvider.setServiceName(serviceProviderDTO.getServiceName());

        Set<Service> currentServices = serviceProvider.getServices();

        for (Service service : currentServices) {
            if (service.getServiceProviders() == null) {
                service.setServiceProviders(new HashSet<>());
            }
            service.getServiceProviders().remove(serviceProvider);
        }
        currentServices.clear();

        if (serviceProviderDTO.getServices() != null) {
            for (String serviceName : serviceProviderDTO.getServices()) {
                Service service = serviceRepository.findByServiceDescription(serviceName);
                if (service == null) {
                    service = new Service(serviceName);
                    serviceRepository.save(service);
                }
                if (service.getServiceProviders() == null) {
                    service.setServiceProviders(new HashSet<>());
                }
                currentServices.add(service);
                service.getServiceProviders().add(serviceProvider);
            }
        }

        ServiceProvider savedServiceProvider = serviceProviderRepository.save(serviceProvider);

        return serviceProviderMapper.mapToServiceProviderDTO(savedServiceProvider);
    }

    @Override
    public Page<ServiceProviderDTO> searchByProvider(String providerName, Pageable pageable) {
        Page<ServiceProvider> serviceProviderPage = serviceProviderRepository.findByServiceNameContaining(providerName, pageable);
        if (serviceProviderPage.isEmpty()) {
            throw new ResourceNotFoundException("Service Provider", "provider", providerName, "SERVICE PROVIDER");
        }
        return serviceProviderPage.map(serviceProviderMapper::mapToServiceProviderDTO);
    }

    @Override
    public Page<ServiceProviderDTO> searchByService(String serviceName, Pageable pageable) {
        Page<ServiceProvider> serviceProviderPage = serviceProviderRepository.findByServicesServiceDescriptionContaining(serviceName, pageable);
        if (serviceProviderPage.isEmpty()) {
            throw new ResourceNotFoundException("Service Provider", "service description", serviceName, "SERVICE PROVIDER");
        }
        return serviceProviderPage.map(serviceProviderMapper::mapToServiceProviderDTO);
    }


    @Override
    public Page<ServiceProviderDTO> getAllProviders(Pageable pageable) {
        Page<ServiceProvider> serviceProviderPage = serviceProviderRepository.findAll(pageable);
        if (serviceProviderPage.isEmpty()) {
            throw new ResourceNotFoundException("There are no providers in the database.", "SERVICE");
        }
        return serviceProviderPage.map(serviceProviderMapper::mapToServiceProviderDTO);
    }

    @Override
    public void validateServices(List<String> services) {
        for (String serviceName : services) {
            if (!serviceName.matches("^[a-zA-Z0-9 ]*$") || serviceName.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Services contain invalid characters.");
            }
        }
    }
}
