package com.example.backend.controller;

import com.example.backend.model.Location;
import com.example.backend.service.BarkdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bark-dates")
@RequiredArgsConstructor
public class BarkdateController {

    private final BarkdateService service;

    @GetMapping
    public List<Location> getAllLocations() {
        return service.getAllLocations();
    }
}
