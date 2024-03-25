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
public class ServiceDTO {

    private Long id;

    @NotEmpty(message = "serviceDescription field should not be null or empty")
    private String serviceDescription;

    @NotEmpty(message = "serviceProviders field should not be null or empty")
    private List<String> serviceProviders;

}
