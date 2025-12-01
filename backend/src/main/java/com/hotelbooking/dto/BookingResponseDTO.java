package com.hotelbooking.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class BookingResponseDTO {
    private Integer bookingId;
    private String fullName;
    private String email;
    private String phone;
    private String roomNumber;
    private BigDecimal price;
    private String hotelName;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private LocalDateTime createAt;

}
