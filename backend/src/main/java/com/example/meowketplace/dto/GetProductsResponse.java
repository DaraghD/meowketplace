package com.example.meowketplace.dto;

import com.example.meowketplace.model.Product;
import com.example.meowketplace.model.User;

public class GetProductsResponse {
    private User user;
    private Product product;

    public User getUser() {
        return user;
    }

    public GetProductsResponse(Product product) {
        this.user = product.getUser();
        this.product = product;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
