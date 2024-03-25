package com.example.backend.model;

import org.springframework.data.annotation.Id;

public record Dog(
     @Id
     String dogId,
     String name,
     String age,
     double size,
     double weight,
     String dogLink,
     String organizationName,
     String organizationLink
) {
}
