package com.example.backend.service;

import com.example.backend.model.Dog;
import com.example.backend.model.Location;
import com.example.backend.model.LocationDto;
import com.example.backend.repository.DogRepository;
import com.example.backend.repository.LocationRepository;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class BarkdateServiceTest {

    private final LocationRepository repo = mock(LocationRepository.class);
    private final DogRepository dogRepo = mock(DogRepository.class);
    private final BarkdateService service = new BarkdateService(repo, dogRepo);

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

    @Test
    void editLocationById_whenLocationIsCalled_thenReturnUpdatedDetailsForLocation() {
        //GIVEN
        LocationDto location = new LocationDto("Munich", "Englischer Garten", "123456");
        Location locationToUpdate = new Location("1", "Munich", "Englischer Garten", "123456");

        when(repo.findById("1")).thenReturn(Optional.of(locationToUpdate));
        when(repo.save(locationToUpdate)).thenReturn(locationToUpdate);

        //WHEN
        Location actual = service.editLocationById("1", location);

        //THEN
        verify(repo).findById("1");
        verify(repo).save(locationToUpdate);
        assertEquals(locationToUpdate, actual);
    }

    @Test
    void deleteLocationById_whenCalledWithValidId_thenDeleteLocation() {
        //GIVEN
        String id = "1";
        Location location = new Location(id, "Munich", "Englischer Garten", "123456");
        when(repo.findById("1")).thenReturn(Optional.of(location));

        //WHEN
        service.deleteLocationById(id);

        //THEN
        verify(repo).findById(id);
        verify(repo).delete(location);
    }

    @Test
    void deleteLocationById_whenCalledWithInvalidId_thenThrowNoSuchElementException() {
        //GIVEN
        String id = "1";
        when(repo.findById(id)).thenReturn(Optional.empty());

        //WHEN & THEN
        assertThrows(NoSuchElementException.class, () -> service.deleteLocationById(id));
    }

    @Test
    void getDogsByLocation_whenCalledWithLocation_thenReturnListOfDogs() {
        //GIVEN
        List<Dog> dogs = List.of(
                new Dog("1", "Munich", "https://dog1.com", "Bello", "25.03.2024", "3 Jahre", 40, 10, "https://dog1.com", "Dog Rescue"),
                new Dog("2", "Munich", "https://dog2.com", "Rex", "25.03.2024", "3 Jahre", 60, 20, "https://dog2.com", "Dog Rescue")
        );
        when(repo.findById("1")).thenReturn(Optional.of(new Location("1", "Munich", "Englischer Garten", "123456")));

        when(dogRepo.findByLocation("Munich")).thenReturn(dogs);

        //WHEN
        List<Dog> actual = service.getDogsByLocation("1");

        //THEN
        verify(repo).findById("1");
        verify(dogRepo).findByLocation("Munich");
        assertEquals(dogs, actual);
    }

}
