package com.example.meowketplace.dto;


public class SignupRequest {

    private String username;
    private String password;
    private String email;
    private boolean is_business;
    private String bio;
    private String services;

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    private String tags;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isIs_business() {
        return is_business;
    }

    public void setIs_business(boolean is_business) {
        this.is_business = is_business;
    }

    @Override
    public String toString() {
        return "SignupRequest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", is_business=" + is_business +
                ", bio='" + bio + '\'' +
                ", services='" + services + '\'' +
                '}';
    }
}
