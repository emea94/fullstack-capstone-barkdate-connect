package com.example.backend.service;

import com.example.backend.model.Dog;
import com.example.backend.model.Location;
import com.example.backend.model.LocationDto;
import com.example.backend.repository.DogRepository;
import com.example.backend.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BarkdateService {

    private final LocationRepository locationRepo;
    private final DogRepository dogRepo;

    public List<Location> getAllLocations() {
        return locationRepo.findAll();
    }

    public Location addLocation(LocationDto location) {
        Location locationToSave = new Location(null, location.city(), location.venue(), location.googlePlusCode());
        return locationRepo.save(locationToSave);
    }

    public Location editLocationById(String id, LocationDto location) {
        Location locationToUpdate = locationRepo.findById(id).orElseThrow();
        return locationRepo.save(locationToUpdate
                .withCity(location.city())
                .withVenue(location.venue())
                .withGooglePlusCode(location.googlePlusCode()));
    }

    public void deleteLocationById(String id) {
        Location location = locationRepo.findById(id).orElseThrow();
        locationRepo.delete(location);
    }


    public List<Dog> getDogsByLocation(String locationId) {
        Location location = locationRepo.findById(locationId).orElseThrow();
        return dogRepo.findByLocation(location.city());
    }
}
