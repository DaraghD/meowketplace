package com.example.meowketplace.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.meowketplace.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByCustomerId(long customerId);
}
