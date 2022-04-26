package com.skiboards.skiesboards.repository;

import com.skiboards.skiesboards.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
