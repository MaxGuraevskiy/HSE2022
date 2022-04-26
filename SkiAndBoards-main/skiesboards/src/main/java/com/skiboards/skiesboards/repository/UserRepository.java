package com.skiboards.skiesboards.repository;

import com.skiboards.skiesboards.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findFirstByName(String name);
    User findUserByNameAndPassword(String name, String password);
    User findUserById(Long id);
}
