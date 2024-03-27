package com.example.backend.service;

import com.example.backend.model.Location;
import com.example.backend.model.LocationDto;
import com.example.backend.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BarkdateService {

    private final LocationRepository locationRepo;

    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }

    public Location addLocation(LocationDto location) {
        Location locationToSave = new Location(null, location.city(), location.venue(), location.googlePlusCode());
        return locationRepo.save(locationToSave);
    }
}
