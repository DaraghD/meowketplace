package com.example.meowketplace.dto;

public class ReviewRequest {
    // user is determined through auth token
    private String review_content;
    private Integer stars; // null if reply
    private Long product_id; // only for top level reviews
    private Long parent_review_id; // null if top level

    @Override
    public String toString() {
        return "review_content : " + review_content + "\n" +
                "stars: " + stars + "\n" +
                "prdocut_id: " + product_id + "\n" +
                "parent id : " + parent_review_id + "\n";
    }

    public Long getParent_review_id() {
        return parent_review_id;
    }

    public void setParent_review_id(Long parent_review_id) {
        this.parent_review_id = parent_review_id;
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
