package com.skiboards.skiesboards.repository;

import com.skiboards.skiesboards.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoryById(Long id);
    Category findCategoryByTitle(String title);
    Category findCategoryByProduct();
}
