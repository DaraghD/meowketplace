package com.example.meowketplace.repository;

import com.example.meowketplace.model.Review;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
