package com.travelhub.pritam.dto;

import java.util.List;

import lombok.Data;

@Data
public class HotelResponseDTO {
    private Long id;
    private String name;
    private String location;
    private String description;
    private double pricePerNight;
    private List<String> amenities;
    private int totalRooms;
    private String sellerUsername; // Optional: show who listed it
}
