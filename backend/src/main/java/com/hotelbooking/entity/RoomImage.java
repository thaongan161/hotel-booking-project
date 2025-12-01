package com.hotelbooking.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "room_image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
