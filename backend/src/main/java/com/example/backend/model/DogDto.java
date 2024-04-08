package com.example.backend.model;

import java.time.LocalDate;

public record DogDto(
        String location,
        String imageUrl,
        String name,
        LocalDate participationBarkdate,
        String age,
        double size,
        double weight,
        String dogLink,
        String organizationName
) {
}
