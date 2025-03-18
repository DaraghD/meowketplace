package com.example.meowketplace.dto;

public class UpdateProduct {
    private String name;
    private String description;
    private String price;
    private String stock;
    private String image;
    private String tags;

    public UpdateProduct() {
    }

    public UpdateProduct(String name, String description, String category, String price, String stock, String image, String tag) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.image = image;
        this.tags = tag;
    }

}
