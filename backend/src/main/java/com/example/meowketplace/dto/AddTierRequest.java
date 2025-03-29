package com.example.meowketplace.dto;

public class AddTierRequest {
    private double price;
    private String name;
    private String description;

    public double getPrice() {
        return price;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescription() {
        return this.description;
    }
}
