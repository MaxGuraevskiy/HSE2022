package com.skiboards.skiesboards.repository;

import com.skiboards.skiesboards.entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
}
