package com.example.backend.model;

public record Dog(
     String id,
     String name,
     String age,
     double size,
     double weight,
     String dogLink,
     String organizationName,
     String organizationLink
) {
}
