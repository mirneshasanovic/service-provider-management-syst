package com.comping.serviceprovidermanagementsystem.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceProviderDTO {
    private Long id;

    @NotEmpty(message = "serviceName field should not be null or empty")
    private String serviceName;

    @NotEmpty(message = "services field should not be null or empty")
    private List<String> services;

}
