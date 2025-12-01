package com.hotelbooking.dto;
import lombok.*;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.RoomImage;

@Data
@Builder
public class RoomResponseDTO {
    private String roomNumber;
    private String hotelName;
    private String phone;
    private String type;
    private BigDecimal price;
    private String status;
    private String description;
    private List<String> imageUrls;

    // ✅ Static factory method
    public static RoomResponseDTO fromEntity(Room room) {
    return RoomResponseDTO.builder()
            .roomNumber(room.getRoomNumber() != null ? room.getRoomNumber().toString() : null)
            .hotelName(room.getHotel() != null ? room.getHotel().getName() : null)
            .phone(room.getHotel() != null ? room.getHotel().getPhone() : null)
            .type(room.getType())
            .price(room.getPrice())
            .status(room.getStatus())
            .description(room.getDescription())
            .imageUrls(room.getImages() != null ?
                room.getImages().stream()
                    .map(RoomImage::getImageUrl)   // ⚠️ sửa đúng tên method lấy URL
                    .collect(Collectors.toList())
                : Collections.emptyList())
            .build();
}
}
