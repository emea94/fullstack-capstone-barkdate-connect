package com.example.backend.model;

public record Location(
        String id,
        String city,
        String venue,
        String googlePlusCode
) {
}
