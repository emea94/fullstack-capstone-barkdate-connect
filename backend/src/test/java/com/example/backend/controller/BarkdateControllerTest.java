package com.example.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
}
