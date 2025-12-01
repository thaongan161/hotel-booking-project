package com.hotelbooking.service;

import com.hotelbooking.dto.RoomResponseDTO;
import com.hotelbooking.entity.Room;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomService {
    List<Room> getAllRooms();
    Optional<Room> getRoomById(Long id);
    List<Room> getRoomByHotel(Long hotelId);
    List<RoomResponseDTO> searchRooms(String city, String type, LocalDate from, LocalDate to);

    Room createRoom(Room room);
    Room updateRoom(Long id, Room updatedRoom);
    void deleteRoom(Long id);
}
