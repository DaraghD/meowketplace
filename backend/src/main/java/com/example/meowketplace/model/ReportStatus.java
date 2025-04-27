package com.example.meowketplace.model;

public enum ReportStatus {
    PENDING,
    RESOLVED, // for review/products it means remove, for user its ban
    DENIED
}
