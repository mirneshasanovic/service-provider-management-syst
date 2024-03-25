package com.comping.serviceprovidermanagementsystem.repository;

import com.comping.serviceprovidermanagementsystem.entity.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    Page<Service> findAll(Pageable pageable);
    Service findByServiceDescription(String serviceDescription);
    Page<Service> findByServiceProviders_ServiceNameContaining(String serviceProviderName, Pageable pageable);
    Page<Service> findByServiceDescriptionContaining(String description, Pageable pageable);
    @Query("SELECT s.serviceDescription FROM Service s")
    Page<String> findAllDescriptions(Pageable pageable);
}