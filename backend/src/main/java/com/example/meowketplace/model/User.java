package com.example.meowketplace.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String bio;

    @Column(nullable = false)
    private boolean is_business;

    @Column(nullable = false)
    private boolean is_verified;

    private String profile_picture;

    @Column(nullable = false)
    private boolean is_admin;

    @Column(nullable = false)
    private boolean is_banned;

    @Column(precision = 2)
    private double business_rating;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Product> products;

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

    public String toJson() {
        return "{" +
                "\"id\":" + id + "," +
                "\"username\":\"" + username + "\"," +
                "\"email\":\"" + email + "\"," +
                "\"password\":\"" + password + "\"," +
                "\"bio\":\"" + bio + "\"," +
                "\"is_business\":" + is_business + "," +
                "\"is_verified\":" + is_verified + "," +
                "\"profile_picture\":\"" + profile_picture + "\"," +
                "\"is_admin\":" + is_admin + "," +
                "\"is_banned\":" + is_banned + "," +
                "\"business_rating\":" + business_rating +
                "}";
    }
}
