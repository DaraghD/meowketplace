package com.example.meowketplace.dto;


import jakarta.validation.constraints.NotNull;

public class SignupDTO {

    private String username;
    private String password;
    private String email;
    //private String address;
    //private String phone_number;
    //private String business_description;

    private boolean is_business;

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

}
