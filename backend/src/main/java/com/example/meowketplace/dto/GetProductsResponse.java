package com.example.meowketplace.dto;

import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.User;
import com.example.meowketplace.model.Tier;
import com.example.meowketplace.model.Review;

import java.util.Date;
import java.util.List;

public class GetProductsResponse {
    private Long id;
    private User user;
    private String productText;
    private String name;
    private int imageCount = 0;
    private Double starRating;
    private Date createdAt;
    private List<Review> reviews;
    private List<Tier> tiers;
    private String tag;

    public GetProductsResponse(Product product) {
        this.id = product.getId();
        this.user = product.getUser();
        this.productText = product.getProductText();
        this.name = product.getName();
        this.imageCount = product.getImageCount();
        this.starRating = product.getStarRating();
        this.createdAt = product.getCreatedAt();
        this.reviews = product.getReviews();
        this.tiers = product.getTiers();
        this.tag = product.getTag();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getProductText() {
        return productText;
    }

    public void setProductText(String productText) {
        this.productText = productText;
    }

    public Double getStarRating() {
        return starRating;
    }

    public void setStarRating(Double starRating) {
        this.starRating = starRating;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Tier> getTiers() {
        return tiers;
    }

    public void setTiers(List<Tier> tiers) {
        this.tiers = tiers;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getImageCount() {
        return imageCount;
    }

    public void setImageCount(int imageCount) {
        this.imageCount = imageCount;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}