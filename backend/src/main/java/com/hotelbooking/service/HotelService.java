package com.hotelbooking.service;

import com.hotelbooking.entity.*;
import com.hotelbooking.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Optional<Hotel> getHotelById(Long id) {
        return hotelRepository.findById(id);
    }

    public Hotel createHotel(Hotel hotel, User currentUser) {
        hotel.setOwner(currentUser);
        return hotelRepository.save(hotel);
    }

    public Hotel updateHotel(Long id, Hotel updatedHotel) {
        return hotelRepository.findById(id).map(hotel -> {
            hotel.setName(updatedHotel.getName());
            hotel.setAddress(updatedHotel.getAddress());
            hotel.setCity(updatedHotel.getCity());
            hotel.setPhone(updatedHotel.getPhone());
            hotel.setEmail(updatedHotel.getEmail());
            hotel.setDescription(updatedHotel.getDescription());
            return hotelRepository.save(hotel);
        }).orElse(null);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
