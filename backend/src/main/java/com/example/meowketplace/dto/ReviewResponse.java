package com.example.meowketplace.dto;

import com.example.meowketplace.model.Review;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ReviewResponse {
    // @JsonProperty("username")
    private String username;
    private String review_content;
    private Integer stars;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long product_id;
    private List<ReviewResponse> replies;

    public List<ReviewResponse> getReplies() {
        return replies;
    }

    public void setReplies(List<ReviewResponse> replies) {
        this.replies = replies;
    }

    public ReviewResponse(Review r) {
        this.username = r.getUser().getUsername();
        this.stars = r.getStarRating();
        this.product_id = r.getProduct().getId();
        this.review_content = r.getReviewText();
        this.replies = r.getReplies() != null
                ? r.getReplies().stream().map(review -> new ReviewResponse(review, true)).toList()
                : List.of();
    }

    public ReviewResponse(Review reply, boolean isReply) {
        if (!isReply) {
            throw new IllegalArgumentException("This constructor should only be used for replies");
        }
        this.username = reply.getUser().getUsername();
        this.stars = null;
        this.product_id = null;
        this.review_content = reply.getReviewText();
        this.replies = reply.getReplies().stream().map(r -> new ReviewResponse(r, true)).toList();
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

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }
}
