package com.skiboards.skiesboards.repository;

import com.skiboards.skiesboards.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
