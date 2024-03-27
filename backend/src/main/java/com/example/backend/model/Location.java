package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("locations")
public record Location(
        @Id
        String LocationId,
        String city,
        String venue,
        String googlePlusCode
) {
}
