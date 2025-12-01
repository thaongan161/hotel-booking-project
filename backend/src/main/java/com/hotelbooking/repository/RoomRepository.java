package com.hotelbooking.repository;

import com.hotelbooking.entity.*;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
    @EntityGraph(attributePaths = {"images"})
    @Query("SELECT r FROM Room r WHERE r.hotel.hotelId = :hotelId")
    List<Room> findByHotelId(@Param("hotelId") Long hotelId);

    @Query("SELECT r FROM Room r " +
        "JOIN r.hotel h " +
        "WHERE (:type IS NULL OR r.type = :type) " +
        "AND LOWER(h.city) = LOWER(:city)")
    List<Room> findByHotelCityAndType(
        @Param("city") String city,
        @Param("type") String type
    );

    @EntityGraph(attributePaths = {"images"})
    Optional<Room> findById(Long id);

    @EntityGraph(attributePaths = {"images"})
    List<Room> findAll();
}
