package com.example.backend.model;

public record DogDto(
        String location,
        String imageUrl,
        String name,
        String participationBarkdate,
        String age,
        double size,
        double weight,
        String dogLink,
        String organizationName
) {
}
