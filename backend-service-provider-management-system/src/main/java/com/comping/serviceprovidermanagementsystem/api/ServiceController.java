package com.comping.serviceprovidermanagementsystem.api;

import com.comping.serviceprovidermanagementsystem.dto.ServiceDTO;
import com.comping.serviceprovidermanagementsystem.service.ServiceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private static final Logger logger = LoggerFactory.getLogger(ServiceController.class);
    private final ServiceService serviceService;

    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public ResponseEntity<Page<ServiceDTO>> getAllServices(
            @RequestParam(required = false) String provider,
            @RequestParam(required = false) String description,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ServiceDTO> servicePage = serviceService.getAllServices(provider, description, page, size);
        return ResponseEntity.ok(servicePage);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getServiceById(@PathVariable Long id) {
        ServiceDTO serviceDTO = serviceService.getServiceById(id);
        return new ResponseEntity<>(serviceDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Long id) {
        serviceService.deleteServiceById(id);
        return ResponseEntity.ok().body("Service with ID " + id + " has been successfully deleted.");
    }

    @PostMapping
    public ResponseEntity<ServiceDTO> addService(@Valid @RequestBody ServiceDTO serviceDTO) {
        serviceService.validateServiceProviders(serviceDTO.getServiceProviders());
        ServiceDTO savedServiceDTO = serviceService.addService(serviceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedServiceDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceDTO> updateService(@PathVariable Long id, @Valid @RequestBody ServiceDTO serviceDTO) {
        serviceService.validateServiceProviders(serviceDTO.getServiceProviders());
        return ResponseEntity.of(Optional.ofNullable(serviceService.updateService(id, serviceDTO)));
    }

    @GetMapping("/service-descriptions")
    public ResponseEntity<Page<String>> getAllServiceDescriptions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<String> serviceDescriptions = serviceService.getAllServiceDescriptions(page, size);
        return ResponseEntity.ok(serviceDescriptions);
    }
}
