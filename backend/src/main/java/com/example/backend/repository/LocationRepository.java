package com.example.backend.repository;

import com.example.backend.model.Location;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
@Document("locations")
public interface LocationRepository extends MongoRepository<Location, String> {
}
