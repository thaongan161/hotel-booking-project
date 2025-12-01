package com.hotelbooking.map;

import com.hotelbooking.dto.HotelResponseDTO;
import com.hotelbooking.entity.Hotel;

public class HotelMapper {
    public static HotelResponseDTO toDTO(Hotel hotel) {
        return HotelResponseDTO.builder()
                .hotelId(hotel.getHotelId())
                .name(hotel.getName())
                .address(hotel.getAddress())
                .city(hotel.getCity())
                .imageUrl(hotel.getImageUrl())
                .phone(hotel.getPhone())
                .email(hotel.getEmail())
                .description(hotel.getDescription())
                .ownerId(hotel.getUser() != null ? hotel.getUser().getUserId() : null)
                .ownerFullName(hotel.getUser() != null ? hotel.getUser().getFullName() : null)
                .ownerEmail(hotel.getUser() != null ? hotel.getUser().getEmail() : null)
                .build();
    }
}

