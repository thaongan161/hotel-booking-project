package com.hotelbooking.map;

import java.util.List;

import com.hotelbooking.dto.RoomResponseDTO;
import com.hotelbooking.entity.Room;
import com.hotelbooking.entity.RoomImage;

public class RoomMapper {
    public static RoomResponseDTO toDTO(Room room) {
        String hotelName = null;
        String hotelPhone = null;

        if (room.getHotel() != null) {
            hotelName = room.getHotel().getName();
            hotelPhone = room.getHotel().getPhone();
        }
        
        List<String> imageUrls = room.getImages() != null
            ? room.getImages().stream().map(RoomImage::getImageUrl).toList()
            : List.of();

        return RoomResponseDTO.builder()
                .roomNumber(room.getRoomNumber())
                .hotelName(hotelName)
                .phone(hotelPhone)
                .type(room.getType())
                .price(room.getPrice())
                .status(room.getStatus())
                .description(room.getDescription())
                .imageUrls(imageUrls)
                .build();
    }
}
