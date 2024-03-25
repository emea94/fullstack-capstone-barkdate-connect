package com.example.backend.repository;

import com.example.backend.model.Dog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DogRepository extends MongoRepository<Dog, String>{
}
