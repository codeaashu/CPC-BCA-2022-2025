package com.ecomproject.service;

import com.ecomproject.model.Order;
import com.ecomproject.model.Seller;
import com.ecomproject.model.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
