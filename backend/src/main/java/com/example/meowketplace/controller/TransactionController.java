package com.example.meowketplace.controller;

import com.example.meowketplace.dto.TransactionRequest;
import com.example.meowketplace.model.Transaction;
import com.example.meowketplace.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequest transactionRequest) {
        Transaction transaction = transactionService.createTransaction(transactionRequest);
        return ResponseEntity.ok(transaction);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Transaction>> getTransactionsByCustomerId(@PathVariable long customerId) {
        List<Transaction> transactions = transactionService.getTransactionsByCustomerId(customerId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/customer/{customerId}/business/{businessId}")
    public ResponseEntity<List<Transaction>> getTransactionsByCustomerAndBusiness(
            @PathVariable long customerId,
            @PathVariable long businessId) {
        List<Transaction> transactions = transactionService.getTransactionsByCustomerAndBusiness(customerId,
                businessId);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/allTransactions")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/customer/{customerId}/pending/{businessId}")
    public ResponseEntity<Boolean> hasPendingTransactionWithBusiness(
            @PathVariable long customerId,
            @PathVariable long businessId) {
        boolean hasPending = transactionService.hasPendingTransactionWithBusiness(customerId, businessId);
        return ResponseEntity.ok(hasPending);
    }
}