package com.example.backend.repository;

import com.example.backend.model.Date;
import com.example.backend.model.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends MongoRepository<Location, String> {
}
