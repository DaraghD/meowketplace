package com.example.meowketplace.model;

import com.example.meowketplace.Views;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.Public.class)
    private Long id;

    @Column(nullable = false, unique = true)
    @JsonView(Views.Public.class)
    private String username;

    @Column(nullable = false, unique = true)
    @JsonView(Views.Internal.class)
    private String email;

    @Column(nullable = false)
    @JsonView(Views.Internal.class)
    private String password;

    @Column(columnDefinition = "TEXT")
    @JsonView(Views.Public.class)
    private String bio;

    @Column(nullable = false)
    @JsonView(Views.Internal.class)
    private boolean is_business;

    @Column(nullable = false)
    @JsonView(Views.Internal.class)
    private boolean is_verified;

    @JsonView(Views.Public.class)
    private String profile_picture;

    @Column(nullable = false)
    @JsonView(Views.Internal.class)
    private boolean is_admin;

    @Column(nullable = false)
    @JsonView(Views.Internal.class)
    private boolean is_banned;

    @Column(precision = 2)
    @JsonView(Views.Public.class)
    private double business_rating;

    @Column
    @JsonView(Views.Public.class)
    private int review_count; // used to calculate avg business rating

    @JsonView(Views.Public.class)
    private String business_tags;

    @JsonBackReference
    @JsonView(Views.Exclude.class) // exclude product list from user responses, might revert later
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Product> products;

    public int getReview_count() {
        return review_count;
    }

    public void setReview_count(int review_count) {
        this.review_count = review_count;
    }

    public String getBusiness_tags() {
        return business_tags;
    }

    public void setBusiness_tags(String business_tags) {
        this.business_tags = business_tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isIs_business() {
        return is_business;
    }

    public void setIs_business(boolean is_business) {
        this.is_business = is_business;
    }

    public boolean isIs_verified() {
        return is_verified;
    }

    public void setIs_verified(boolean is_verified) {
        this.is_verified = is_verified;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", is_business=" + is_business +
                ", is_verified=" + is_verified +
                ", is_admin=" + is_admin +
                ", profile_picture='" + profile_picture + '\'' +
                ", business_rating=" + business_rating +
                ", bio='" + bio + '\'' +
                '}';
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfile_picture() {
        return profile_picture;
    }

    public void setProfile_picture(String profile_picture) {
        this.profile_picture = profile_picture;
    }

    public boolean isIs_admin() {
        return is_admin;
    }

    public void setIs_admin(boolean is_admin) {
        this.is_admin = is_admin;
    }

    public boolean isIs_banned() {
        return is_banned;
    }

    public void setIs_banned(boolean is_banned) {
        this.is_banned = is_banned;
    }

    public double getBusiness_rating() {
        return business_rating;
    }

    public void setBusiness_rating(double business_rating) {
        this.business_rating = business_rating;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
