package com.example.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Data
public final class Date {
    @Id
    private final String dateId;
    private final String city;
    private final LocalDate[] dates;
}
