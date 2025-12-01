package com.hotelbooking.controller;

import com.hotelbooking.dto.AuthResponse;
import com.hotelbooking.dto.LoginRequest;
import com.hotelbooking.dto.RegisterRequest;
import com.hotelbooking.service.AuthService;
import com.hotelbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
        }

        AuthResponse response = authService.register(request); // ✅ gọi service để xử lý
        return ResponseEntity.ok(response);                    // ✅ trả về token
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
