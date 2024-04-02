package com.example.backend.controller;

import com.example.backend.model.Location;
import com.example.backend.model.LocationDto;
import com.example.backend.service.BarkdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public Location addLocation(@RequestBody LocationDto location) {
        return service.addLocation(location);
    }

    @PutMapping("/{id}")
    public Location editLocationById(@PathVariable String id, @RequestBody LocationDto location) {
        return service.editLocationById(id, location);
    }

}
