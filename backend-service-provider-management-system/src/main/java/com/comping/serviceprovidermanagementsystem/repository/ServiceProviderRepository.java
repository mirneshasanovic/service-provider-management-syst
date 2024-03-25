package com.comping.serviceprovidermanagementsystem.repository;

import com.comping.serviceprovidermanagementsystem.entity.ServiceProvider;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, Long> {
    ServiceProvider findByServiceName(String serviceName);
    Page<ServiceProvider> findByServiceNameContaining(String serviceName, Pageable pageable);
    Page<ServiceProvider> findByServicesServiceDescriptionContaining(String serviceName, Pageable pageable);
}
