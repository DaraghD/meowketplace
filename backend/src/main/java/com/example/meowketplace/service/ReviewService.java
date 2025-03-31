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
        if (!user.isIs_verified())
            throw new Exception("Only verified users can leave reviews");

        if (r.getStars() > 5 || r.getStars() < 0)
            throw new Exception("Stars must be between 0 and 5");

        for (Review re : product.getReviews()) {
            if (re.getUser().getId() == user.getId())
                throw new Exception("You have already reviewed this product");
        }
        // update business review count and rating score
        User business = product.getUser();
        business.setReview_count(business.getReview_count() + 1);
        Double rating = (business.getBusiness_rating() + r.getStars()) / business.getReview_count();
        business.setBusiness_rating(rating);
        userRepository.save(business);

        // update product review count and rating score
        product.setReview_count(product.getReview_count() + 1);
        Double p_rating = (product.getStarRating() + r.getStars()) / product.getReview_count();
        product.setStarRating(p_rating);

        Review review = new Review(r, product, user);
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
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).get();
    }

    public void deleteReview(User user, Review review) throws Exception {
        if (user.getId() != review.getUser().getId() || !user.isIs_admin())
            throw new Exception("User unauthorized to delete review");
        reviewRepository.delete(review);
    }

}
