package com.example.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@With
@Document("dogs")
public record Dog (
        String id,
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
