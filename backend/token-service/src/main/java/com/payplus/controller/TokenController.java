package com.payplus.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/token")
public class TokenController {
    @PostMapping("/create")
    public Map<String, Object> createToken(@RequestBody Map<String, String> cardData) {
        String cardNumber = cardData.get("cardNumber");
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("token", "tok_" + System.currentTimeMillis());
        response.put("cardType", determineCardType(cardNumber));
        response.put("lastFour", cardNumber.substring(cardNumber.length() - 4));
        response.put("expiry", cardData.get("expiryDate"));
        return response;
    }

    private String determineCardType(String cardNumber) {
        if (cardNumber.startsWith("4")) return "VISA";
        if (cardNumber.startsWith("5")) return "MasterCard";
        if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) return "American Express";
        return "Unknown";
    }
}