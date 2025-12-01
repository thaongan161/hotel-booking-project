package com.hotelbooking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "hotel")
@Data
@AllArgsConstructor
@Builder
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hotel_id")
    private Integer hotelId;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(length = 500)
    private String address;

    @Column(length = 20)
    private String city;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(length = 20)
    private String phone;

    @Column(length = 100)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id") // FK user_id
    private User user;

//     Constructors
    public Hotel() {}

    public Hotel(String name, String address, String city, String imageUrl, String phone, String email, String description) {
        this.name = name;
        this.address = address;
        this.city = city;
        this.imageUrl = imageUrl;
        this.phone = phone;
        this.email = email;
        this.description = description;
    }

    @JsonIgnore
    public User getOwner(){
        return user;
    }

    public void setOwner(User user){
        this.user = user;
    }

}
