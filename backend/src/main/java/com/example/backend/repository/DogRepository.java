package com.example.backend.repository;

import com.example.backend.model.Dog;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Document("dogs")
public interface DogRepository extends MongoRepository<Dog, String> {
    List<Dog> findByLocation(String city);
}
