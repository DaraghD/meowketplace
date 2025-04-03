package com.example.meowketplace.dto;

public class TransactionRequest {
    private Long id;
    private long customerId;
    private long productId;

    public TransactionRequest(Long id, long customerId, long productId) {
        this.id = id;
        this.customerId = customerId;
        this.productId = productId;
    }

    public Long getId() {
        return this.id;
    }

    public Long getCustomerId() {
        return this.customerId;
    }

    public long getProductId() {
        return this.productId;
    }
}
