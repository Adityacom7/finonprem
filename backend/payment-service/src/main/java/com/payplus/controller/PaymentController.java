package com.payplus.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @PostMapping("/process")
    public Map<String, Object> processPayment(@RequestBody Map<String, Object> paymentRequest) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("transactionId", "txn_" + System.currentTimeMillis());
        response.put("amount", paymentRequest.get("amount"));
        response.put("currency", paymentRequest.get("currency"));
        response.put("status", "completed");
        response.put("timestamp", new Date().toString());
        return response;
    }

    @GetMapping("/history")
    public List<Map<String, Object>> getPaymentHistory() {
        List<Map<String, Object>> history = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            Map<String, Object> transaction = new HashMap<>();
            transaction.put("id", i);
            transaction.put("amount", 100 * i);
            transaction.put("currency", "USD");
            transaction.put("status", "completed");
            transaction.put("date", new Date().toString());
            history.add(transaction);
        }
        return history;
    }
}