package com.hotelbooking.controller;

import java.time.LocalDate;
import java.util.*;

import com.hotelbooking.dto.RoomResponseDTO;
import com.hotelbooking.map.RoomMapper;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hotelbooking.entity.Room;
import com.hotelbooking.payload.ApiResponse;
import com.hotelbooking.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping()
    public ResponseEntity<?> getAllRooms() {
        List<RoomResponseDTO> rooms = roomService.getAllRooms()
                .stream()
                .map(RoomMapper::toDTO)
                .toList();
        return ResponseEntity.ok(new ApiResponse<>("Fetched all room", rooms));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRoomById(@PathVariable Integer id) {
        Optional<RoomResponseDTO> room = roomService.getRoomById(id.longValue())
                .map(RoomMapper::toDTO);
        return ResponseEntity.ok(new ApiResponse<>("Room found", room));
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<?> getRoomByHotelId(@PathVariable Long hotelId) {
        List<RoomResponseDTO> rooms = roomService.getRoomByHotel(hotelId)
                .stream()
                .map(RoomMapper::toDTO)
                .toList();
        return ResponseEntity.ok(new ApiResponse<>("List room by hotel", rooms));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchRooms(
        @RequestParam String city,
        @RequestParam(required = false) String type,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        List<RoomResponseDTO> results = roomService.searchRooms(city, type, from, to);
        return ResponseEntity.ok(results);
    }


    @PostMapping()
    public ResponseEntity<?> createRoom(@RequestBody Room room) {
        return ResponseEntity.ok(new ApiResponse<>("Room added", roomService.createRoom(room)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Room room) {
        return ResponseEntity.ok(new ApiResponse<>("Room updated", roomService.updateRoom(id, room)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>("Room deleted", null));
    }

}
