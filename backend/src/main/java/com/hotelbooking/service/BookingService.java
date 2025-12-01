package com.hotelbooking.service;

import com.hotelbooking.dto.BookingRequest;
import com.hotelbooking.entity.*;
import com.hotelbooking.repository.*;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository){
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getAllBookings() { return bookingRepository.findAll();}

    public Optional<Booking> getBookingById(Integer id) { return bookingRepository.findById(id);}

    public List<Booking> getBookingsByUserId(Integer userId) { return bookingRepository.findByUserId(userId);}

    public Booking createBooking(BookingRequest request, User user, Room room) {

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckInDate(request.getCheckInDate());
        booking.setCheckOutDate(request.getCheckOutDate());
        booking.setStatus("pending");

        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Integer id, Booking updatedbooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setRoom(updatedbooking.getRoom());
            booking.setStatus(updatedbooking.getStatus());
            booking.setCheckInDate(updatedbooking.getCheckInDate());
            booking.setCheckOutDate(updatedbooking.getCheckOutDate());
            return bookingRepository.save(booking);
        }).orElse(null);
    }

    public void deleteBooking(Integer id) { bookingRepository.deleteById(id); }

}
