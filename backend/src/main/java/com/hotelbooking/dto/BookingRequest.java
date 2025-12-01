package com.hotelbooking.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingRequest {
    private Long roomId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
}