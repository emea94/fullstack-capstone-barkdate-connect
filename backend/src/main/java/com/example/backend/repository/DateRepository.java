package com.example.backend.repository;

import com.example.backend.model.Date;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DateRepository extends MongoRepository<Date, String> {
}
