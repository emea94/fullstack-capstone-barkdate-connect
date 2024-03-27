package com.example.backend.model;

public record LocationDto(
        String city,
        String venue,
        String googlePlusCode
) {
}
