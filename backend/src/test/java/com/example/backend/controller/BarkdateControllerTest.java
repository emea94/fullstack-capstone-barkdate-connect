package com.example.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class BarkdateControllerTest {

    @Autowired
    private MockMvc mvc;

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
                .andExpect(jsonPath("$.LocationId").isNotEmpty());
    }
}
