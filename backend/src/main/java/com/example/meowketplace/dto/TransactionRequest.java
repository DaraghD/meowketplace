package com.example.meowketplace.dto;

public class TransactionRequest {
    private Long id;
    private long customerId;
    private long productId;
    private String status;
    private long businessId;

    public TransactionRequest(Long id, long customerId, long productId, String status, long businessId) {
        this.id = id;
        this.customerId = customerId;
        this.businessId = businessId;
        this.productId = productId;
        this.status = status;
    }

    public Long getId() {
        return this.id;
    }

    public Long getCustomerId() {
        return this.customerId;
    }

    public Long getBusinessId() {
        return this.businessId;
    }

    public long getProductId() {
        return this.productId;
    }

    public String getStatus() {
        return this.status;
    }
}
