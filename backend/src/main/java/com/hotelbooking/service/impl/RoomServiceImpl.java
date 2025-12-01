package com.hotelbooking.service.impl;

import com.hotelbooking.dto.RoomResponseDTO;
import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Hotel;
import com.hotelbooking.entity.Room;
import com.hotelbooking.repository.BookingRepository;
import com.hotelbooking.repository.HotelRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.service.RoomService;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;
    private final BookingRepository bookingRepository;

    public RoomServiceImpl(RoomRepository roomRepository, HotelRepository hotelRepository, BookingRepository bookingRepository) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
        this.bookingRepository = bookingRepository;
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Optional<Room> getRoomById(Long id) {
        return roomRepository.findById(id);
    }

    @Override
    public List<Room> getRoomByHotel(Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    private boolean isAvailable(Room room, LocalDate from, LocalDate to) {
        List<Booking> bookings = bookingRepository.findByRoomRoomIdAndStatus(room.getRoomId(), "confirmed");

        for (Booking booking : bookings) {
            LocalDate bookedFrom = booking.getCheckInDate();
            LocalDate bookedTo = booking.getCheckOutDate();

            // Nếu có bất kỳ booking nào giao nhau với khoảng từ-to, thì phòng không rảnh
            if (!(to.isBefore(bookedFrom) || from.isAfter(bookedTo))) {
                return false;
            }
        }
        return true;
    }


    @Override
    public List<RoomResponseDTO> searchRooms(String city, String type, LocalDate from, LocalDate to) {
        List<Room> allRooms = roomRepository.findAll();

        return allRooms.stream()
                .filter(room -> 
                    (city == null || room.getHotel().getCity().equalsIgnoreCase(city)) &&
                    (type == null || room.getType().equalsIgnoreCase(type)) &&
                    isAvailable(room, from, to)
                )
                .map(RoomResponseDTO::fromEntity)
                .collect(Collectors.toList());
    }


    @Override
    public Room createRoom(Room room) {
        if (room.getHotel() == null || room.getHotel().getHotelId() == null) {
            throw new IllegalArgumentException("Hotel ID must be provided");
        }

        Hotel hotel = hotelRepository.findById(room.getHotel().getHotelId().longValue())
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found"));

        room.setHotel(hotel);
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room updatedRoom) {
        return roomRepository.findById(id).map(room -> {
            room.setType(updatedRoom.getType());
            room.setPrice(updatedRoom.getPrice());
            room.setStatus(updatedRoom.getStatus());
            room.setDescription(updatedRoom.getDescription());
            return roomRepository.save(room);
        }).orElse(null);
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
