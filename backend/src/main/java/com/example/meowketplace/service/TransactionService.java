package com.example.meowketplace.service;

import com.example.meowketplace.dto.TransactionRequest;
import com.example.meowketplace.model.Transaction;
import com.example.meowketplace.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public Transaction createTransaction(TransactionRequest transactionRequest) {
        Transaction transaction = new Transaction();
        transaction.setCustomerId(transactionRequest.getCustomerId());
        transaction.setProductId(transactionRequest.getProductId());
        transaction.setStatus(transactionRequest.getStatus());
        transaction.setBusinessId(transactionRequest.getBusinessId()

        );

        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsByCustomerId(long customerId) {
        return transactionRepository.findAllByCustomerId(customerId);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}