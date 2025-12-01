package com.hotelbooking.repository;

import com.hotelbooking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    @Query("SELECT b FROM Booking b WHERE b.user.userId = :userId")
    List<Booking> findByUserId(@Param("userId") Integer userId);

    @Query("SELECT CASE WHEN COUNT(b) > 0 THEN true ELSE false END " +
        "FROM Booking b " +
        "WHERE b.room.roomId = :roomId " +
        "AND b.status = 'confirmed' " +
        "AND (b.checkInDate < :to AND b.checkOutDate > :from)")
    boolean isRoomBookedBetween(
        @Param("roomId") Long roomId,
        @Param("from") LocalDate from,
        @Param("to") LocalDate to
    );

    List<Booking> findByRoomRoomIdAndStatus(Integer roomId, String status);

}
