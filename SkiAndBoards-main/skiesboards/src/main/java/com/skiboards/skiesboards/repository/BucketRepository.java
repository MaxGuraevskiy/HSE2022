package com.skiboards.skiesboards.repository;

import com.skiboards.skiesboards.entity.Bucket;
import com.skiboards.skiesboards.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketRepository extends JpaRepository<Bucket, Long> {
    Bucket findBucketByUserId(Long id);
    Bucket findBucketByUser(User user);
}