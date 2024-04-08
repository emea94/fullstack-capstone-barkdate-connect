package com.example.backend.controller;

import com.example.backend.model.DogDto;
import com.example.backend.model.Location;
import com.example.backend.repository.LocationRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class BarkdateControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private LocationRepository repo;

    @Test
    void getAllLocations_whenCalledInitially_thenReturnEmptyList() throws Exception {
        //Given
        //When&Then
        mvc.perform(MockMvcRequestBuilders.get("/api/bark-dates"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void addLocation_whenNewRestaurantIsAdded_thenReturnRestaurant() throws Exception {
        //GIVEN
        //WHEN&THEN
        mvc.perform(post("/api/bark-dates")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "city": "Munich",
                                "venue": "Englischer Garten",
                                "googlePlusCode": "123456"
                            }
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                "city": "Munich",
                                "venue": "Englischer Garten",
                                "googlePlusCode": "123456"
                            }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    void editLocationById_whenIdForLocationIsCalled_thenReturnUpdatedLocationDetails() throws Exception {
        //GIVEN
        repo.save(new Location("1", "Munich", "Englischer Garten", "123456"));
        //WHEN&THEN
        mvc.perform(put("/api/bark-dates/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                            {
                                "city": "Munich",
                                "venue": "Olympiapark",
                                "googlePlusCode": "123456"
                            }
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                            {
                                "city": "Munich",
                                "venue": "Olympiapark",
                                "googlePlusCode": "123456"
                            }
                        """));
    }

    @Test
    void deleteLocationById_whenCalledWithValidId_thenStatusIsOk() throws Exception {
        //GIVEN
        String id = "1";
        Location location = new Location(id, "Munich", "Englischer Garten", "123456");
        repo.save(location);

        //WHEN&THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/bark-dates/" + id))
                .andExpect(MockMvcResultMatchers.status().isOk());

        assertFalse(repo.findById(id).isPresent());
    }

    @Test
    void deleteLocationById_whenCalledWithInvalidId_thenThrowException() throws Exception {
        //GIVEN
        String invalidId = "123";

        //WHEN&THEN
        mvc.perform(MockMvcRequestBuilders.delete("/api/bark-dates/" + invalidId))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void getDogsByLocation_whenCalledWithLocation_thenReturnDogs() throws Exception {
        //GIVEN
        // WHEN&THEN
        mvc.perform(MockMvcRequestBuilders.get("/api/bark-dates/Frankfurt"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }
}
