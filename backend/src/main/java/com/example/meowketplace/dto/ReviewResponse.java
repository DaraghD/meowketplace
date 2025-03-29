package com.example.meowketplace.dto;

import com.example.meowketplace.model.Review;
import java.util.List;

public class ReviewResponse {
    private String username;
    private String review_content;
    private int stars;
    private Long product_id;
    private List<Review> replies;

    public List<Review> getReplies() {
        return replies;
    }

    public void setReplies(List<Review> replies) {
        this.replies = replies;
    }

    public ReviewResponse(Review r) {
        this.replies = r.getReplies();
        this.username = r.getUser().getUsername();
        this.stars = r.getStarRating();
        this.product_id = r.getProduct().getId();
        this.review_content = r.getReviewText();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Long product_id) {
        this.product_id = product_id;
    }

    public String getReview_content() {
        return review_content;
    }

    public void setReview_content(String review_content) {
        this.review_content = review_content;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

}
