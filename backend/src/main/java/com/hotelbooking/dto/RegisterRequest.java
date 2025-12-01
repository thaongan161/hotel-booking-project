package com.hotelbooking.dto;

import lombok.*;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String role; //default: customer
}
