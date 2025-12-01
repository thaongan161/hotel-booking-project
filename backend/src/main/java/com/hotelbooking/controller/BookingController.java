package com.hotelbooking.controller;

import com.hotelbooking.dto.BookingRequest;
import com.hotelbooking.dto.BookingResponseDTO;
import com.hotelbooking.entity.*;
import com.hotelbooking.map.BookingMapper;
import com.hotelbooking.payload.ApiResponse;
import com.hotelbooking.service.BookingService;
import com.hotelbooking.service.RoomService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController extends BaseController{
    @Autowired
    private final RoomService roomService;
    
    private final BookingService bookingService;

    public BookingController(BookingService bookingService, RoomService roomService) {
        this.bookingService = bookingService;
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<?> getAllBookings() {
        List<BookingResponseDTO> bookings = bookingService.getAllBookings()
                .stream()
                .map(BookingMapper::toDTO)
                .toList();
        return ResponseEntity.ok(new ApiResponse<>("Fetch all bookings", bookings));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Integer id) {
        Optional<BookingResponseDTO> booking = bookingService.getBookingById(id)
                .map(BookingMapper::toDTO);
        return  ResponseEntity.ok(new ApiResponse<>("Booking found", booking));
    }

    // @GetMapping("/user/{userId}/booking")
    // public ResponseEntity<?> getBookingsByUserId(@PathVariable Integer userId) {
    //     List<BookingResponseDTO> bookings = bookingService.getBookingByUserId(userId)
    //             .stream()
    //             .map(BookingMapper::toDTO)
    //             .toList();
    //     return  ResponseEntity.ok(new ApiResponse<>("Booking found", bookings));
    // }

    @PostMapping
    public ResponseEntity<ApiResponse<BookingResponseDTO>> createBooking(@RequestBody BookingRequest request) {
        User currentUser = getCurrentUser();

        Room room = roomService.getRoomById(request.getRoomId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found"));

        Booking savedBooking = bookingService.createBooking(request, currentUser, room);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>("Booking created successfully", BookingMapper.toDTO(savedBooking))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BookingResponseDTO>> updateBooking(@PathVariable Integer id, Booking updatedBooking) {
        bookingService.getBookingById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        Booking updated = bookingService.updateBooking(id, updatedBooking);
        return ResponseEntity.ok(new ApiResponse<>("Update successful", BookingMapper.toDTO(updated)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHotel(@PathVariable Integer id) {
        bookingService.getBookingById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        bookingService.deleteBooking(id);

        return ResponseEntity.ok(new ApiResponse<>("Delete successful", null));
    }
}
