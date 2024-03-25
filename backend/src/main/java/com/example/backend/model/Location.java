package com.example.backend.model;

import org.springframework.data.annotation.Id;

public record Location(
        @Id
        String LocationId,
        String city,
        String venue,
        String googlePlusCode
) {
}
