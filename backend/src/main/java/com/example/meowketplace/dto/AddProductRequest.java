package com.example.meowketplace.dto;

import java.util.List;

public class AddProductRequest {
    private Long userId;
    private String name;
    private String productText;
    private List<AddTierRequest> tiers;

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getProductText() {
        return productText;
    }

    public List<AddTierRequest> getTiers() {
        return tiers;
    }
}
