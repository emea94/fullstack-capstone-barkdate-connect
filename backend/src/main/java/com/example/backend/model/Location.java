package com.example.backend.model;

import lombok.With;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@With
@Document("locations")
public record Location(
        @Id
        String id,
        String city,
        String venue,
        String googlePlusCode
) {
}
