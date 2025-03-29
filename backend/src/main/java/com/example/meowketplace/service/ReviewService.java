package com.example.meowketplace.service;

import org.springframework.stereotype.Service;

import com.example.meowketplace.dto.ReviewRequest;
import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.Review;
import com.example.meowketplace.model.User;
import com.example.meowketplace.repository.ProductRepository;
import com.example.meowketplace.repository.ReviewRepository;

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

    public void addReply(ReviewRequest reply_request, User user) {
        System.out.println("parent review of id: " + reply_request.getParent_review_id());
        Review parent = reviewRepository.findById(reply_request.getParent_review_id()).get();
        Review reply = new Review(reply_request, null, user);// reply doesnt have product

        reply.setParent(parent);
        parent.addReply(reply);

        reviewRepository.save(parent);
        reviewRepository.save(reply);
    }

}
