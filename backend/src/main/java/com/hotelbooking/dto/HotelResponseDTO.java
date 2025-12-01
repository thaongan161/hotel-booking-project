package com.hotelbooking.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HotelResponseDTO {
    private Integer hotelId;
    private String name;
    private String address;
    private String city;
    private String imageUrl;
    private String phone;
    private String email;
    private String description;

    // Thông tin người sở hữu (user tạo khách sạn)
    private Integer ownerId;
    private String ownerFullName;
    private String ownerEmail;
}
