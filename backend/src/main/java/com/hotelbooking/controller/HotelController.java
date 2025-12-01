package com.hotelbooking.controller;

import com.hotelbooking.dto.HotelResponseDTO;
import com.hotelbooking.entity.Hotel;
import com.hotelbooking.entity.User;
import com.hotelbooking.map.HotelMapper;
import com.hotelbooking.payload.ApiResponse;
import com.hotelbooking.service.HotelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController extends BaseController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public ResponseEntity<?> getAllHotels() {
        List<HotelResponseDTO> hotels = hotelService.getAllHotels()
                .stream()
                .map(HotelMapper::toDTO)
                .toList();

        return ResponseEntity.ok(new ApiResponse<>("Fetched all hotels", hotels));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHotel(@PathVariable Integer id) {
        Optional<HotelResponseDTO> hotel = hotelService.getHotelById(id.longValue())
                .map(HotelMapper::toDTO);
        return ResponseEntity.ok(new ApiResponse<>("Hotel found", hotel));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<HotelResponseDTO>> createHotel(@RequestBody Hotel hotel) {
        User currentUser = getCurrentUser();
        Hotel savedHotel = hotelService.createHotel(hotel, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ApiResponse<>("Hotel created successfully", HotelMapper.toDTO(savedHotel))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<HotelResponseDTO>> updateHotel(@PathVariable Long id, @RequestBody Hotel updatedHotel) {
        Hotel existingHotel = hotelService.getHotelById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        verifyOwnership(existingHotel);

        Hotel updated = hotelService.updateHotel(id, updatedHotel);
        return ResponseEntity.ok(new ApiResponse<>("Update successful", HotelMapper.toDTO(updated)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteHotel(@PathVariable Long id) {
        Hotel hotel = hotelService.getHotelById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        verifyOwnership(hotel);
        hotelService.deleteHotel(id);

        return ResponseEntity.ok(new ApiResponse<>("Delete successful", null));
    }

}
