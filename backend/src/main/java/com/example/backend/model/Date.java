package com.example.backend.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public final class Date {
    private final String id;
    private final LocalDate[] dates;
}
