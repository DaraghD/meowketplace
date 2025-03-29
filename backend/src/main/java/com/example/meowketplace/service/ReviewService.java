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
    private final UserRepository userRepository;

    public ReviewService(ProductRepository productRepository, UserRepository userRepository,
            ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public void addReview(ReviewRequest r, User user, Product product) throws Exception {
        if (!user.isIs_verified()) {
            throw new Exception("Only verified users can leave reviews");
        }
        // update business review count and rating score
        User business = product.getUser();
        business.setReview_count(business.getReview_count() + 1);
        Double rating = (business.getBusiness_rating() + r.getStars()) / business.getReview_count();
        business.setBusiness_rating(rating);
        userRepository.save(business);

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
