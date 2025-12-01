package com.hotelbooking.map;

import com.hotelbooking.dto.BookingResponseDTO;
import com.hotelbooking.entity.*;

public class BookingMapper {
    public static BookingResponseDTO toDTO(Booking booking) {
        return  BookingResponseDTO.builder()
                .bookingId(booking.getBookingId())
                .fullName(booking.getUser().getFullName())
                .email(booking.getUser().getEmail())
                .phone(booking.getUser().getPhone())
                .roomNumber(booking.getRoom().getRoomNumber())
                .price(booking.getRoom().getPrice())
                .hotelName(booking.getRoom().getHotel().getName())
                .checkInDate(booking.getCheckInDate())
                .checkOutDate(booking.getCheckOutDate())
                .createAt(booking.getCreateAt())
                .build();
    }
}
