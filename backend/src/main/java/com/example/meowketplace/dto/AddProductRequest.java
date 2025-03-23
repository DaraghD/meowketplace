package com.example.meowketplace.dto;

import java.util.List;

public class AddProductRequest {
    private String name;
    private String productText;
    private List<AddTierRequest> tiers;
    private String tag;

    public String getTag() {
        return tag;
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
