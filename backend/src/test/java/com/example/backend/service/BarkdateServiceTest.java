package com.example.backend.service;

import com.example.backend.model.Location;
import com.example.backend.model.LocationDto;
import com.example.backend.repository.LocationRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BarkdateServiceTest {

    private final LocationRepository repo = mock(LocationRepository.class);
    private final BarkdateService service = new BarkdateService(repo);

    @Test
    void getAllLocations_whenCalledInitially_thenReturnEmptyList() {
        //Given
        List<Location> expected = new ArrayList<>();
        when(repo.findAll()).thenReturn(new ArrayList<>());
        //When
        List<Location> actual = service.getAllLocations();
        //Then
        assertEquals(expected, actual);
        verify(repo).findAll();
    }

    @Test
    void addLocation_whenNewLocationIsAdded_thenReturnLocation() {
        //GIVEN
        LocationDto location = new LocationDto("Munich", "Englischer Garten", "123456");
        Location locationToSave = new Location("Test-ID", "Munich", "Englischer Garten", "123456");

        when(repo.save(any(Location.class))).thenReturn(locationToSave);

        //WHEN
        Location actual = service.addLocation(location);

        //THEN
        verify(repo).save(any(Location.class));
        assertEquals(locationToSave, actual);
    }
}
