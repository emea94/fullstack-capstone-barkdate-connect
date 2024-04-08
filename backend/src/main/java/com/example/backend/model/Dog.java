package com.example.backend.model;

import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("dogs")
public record Dog (
        String id,
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
