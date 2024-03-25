package com.comping.serviceprovidermanagementsystem.api;

import com.comping.serviceprovidermanagementsystem.dto.ServiceProviderDTO;
import com.comping.serviceprovidermanagementsystem.service.ServiceProviderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service-providers")
public class ServiceProviderController {

    private final ServiceProviderService serviceProviderService;

    @Autowired
    public ServiceProviderController(ServiceProviderService serviceProviderService) {
        this.serviceProviderService = serviceProviderService;
    }

    @GetMapping
    public ResponseEntity<Page<ServiceProviderDTO>> getAllServiceProviders(
            @RequestParam(required = false) String provider,
            @RequestParam(required = false) String service,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<ServiceProviderDTO> servicePage = serviceProviderService.getAllProviders(provider, service, page, size);
        return ResponseEntity.ok(servicePage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceProviderDTO> getServiceProviderById(@PathVariable Long id) {
        ServiceProviderDTO serviceProvider = serviceProviderService.getServiceProviderById(id);
        return new ResponseEntity<>(serviceProvider, HttpStatus.OK);    }

    @PostMapping
    public ResponseEntity<ServiceProviderDTO> addServiceProvider(@Valid @RequestBody ServiceProviderDTO serviceProviderDTO) {
        serviceProviderService.validateServices(serviceProviderDTO.getServices());
        ServiceProviderDTO savedServiceProviderDTO = serviceProviderService.addServiceProvider(serviceProviderDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedServiceProviderDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceProviderDTO> updateServiceProvider(@PathVariable Long id, @Valid @RequestBody ServiceProviderDTO serviceProviderDTO) {
        ServiceProviderDTO updatedServiceProviderDTO = serviceProviderService.updateServiceProvider(id, serviceProviderDTO);
        if (updatedServiceProviderDTO != null) {
            return ResponseEntity.ok(updatedServiceProviderDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteServiceProvider(@PathVariable Long id) {
        serviceProviderService.deleteServiceProviderById(id);
        return ResponseEntity.ok().body("Service Provider with ID " + id + " has been successfully deleted.");
    }
}
