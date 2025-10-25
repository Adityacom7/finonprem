package com.payplus.controller;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        Map<String, Object> response = new HashMap<>();
        if ("admin".equals(username) && "password".equals(password)) {
            response.put("success", true);
            response.put("token", "jwt-token-" + System.currentTimeMillis());
            response.put("user", Map.of("id", 1, "username", "admin", "role", "administrator"));
        } else {
            response.put("success", false);
            response.put("error", "Invalid credentials");
        }
        return response;
    }

    @PostMapping("/validate")
    public Map<String, Object> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        Map<String, Object> response = new HashMap<>();
        response.put("valid", token != null && token.startsWith("jwt-token-"));
        response.put("user", Map.of("id", 1, "username", "admin"));
        return response;
    }
}