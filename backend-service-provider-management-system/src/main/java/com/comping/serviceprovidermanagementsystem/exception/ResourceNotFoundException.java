package com.comping.serviceprovidermanagementsystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

    private String resourceName;
    private String fieldName;
    private String fieldValue;

    private String fieldName2;
    private String fieldValue2;

    private final String resourceType;

    public ResourceNotFoundException(String resourceName, String fieldName, String fieldValue, String resourceType){
        super(String.format("%s with %s: '%s' not found.", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.resourceType = resourceType;
    }

    public ResourceNotFoundException(String resourceName, String resourceType) {
        super(String.format("%s", resourceName));
        this.resourceType = resourceType;
    }

    public ResourceNotFoundException(String resourceName, String fieldName, String fieldValue, String fieldName2, String fieldValue2, String resourceType){
        super(String.format("%s with %s: '%s' and %s: '%s' not found.", resourceName, fieldName, fieldValue, fieldName2, fieldValue2));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.fieldName2 = fieldName2;
        this.fieldValue2 = fieldValue2;
        this.resourceType = resourceType;
    }

    public String getResourceType() {
        return resourceType;
    }
}
