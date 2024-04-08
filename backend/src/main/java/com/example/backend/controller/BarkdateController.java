package com.example.backend.controller;

import com.example.backend.model.DogDto;
import com.example.backend.model.Location;
import com.example.backend.model.LocationDto;
import com.example.backend.service.BarkdateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

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

    @DeleteMapping("/{id}")
    public void deleteLocationById(@PathVariable String id) {
        service.deleteLocationById(id);
    }

    @GetMapping("/{location}")
    public List<DogDto> getDogsByLocation(@PathVariable String location) {
        return service.getDogsByLocation(location);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNoSuchElementException(NoSuchElementException e) {
        return e.getMessage();
    }

}
