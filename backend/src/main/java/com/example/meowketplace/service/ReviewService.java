package com.example.meowketplace.service;

import org.springframework.stereotype.Service;

import com.example.meowketplace.dto.ReviewRequest;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.Review;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.ProductRepository;
import com.example.meowketplace.repository.ReviewRepository;
import com.example.meowketplace.repository.UserRepository;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;

    public ReviewService(ProductRepository productRepository,
            ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public void addReview(ReviewRequest r, User user, Product product) {
        Review review = new Review(r, product, user);
        review = reviewRepository.save(review);
        product.addReview(review);
        productRepository.save(product);
    }

}
