package com.travelhub.pritam.dto;

import lombok.Data;
import java.util.List;

@Data
public class HotelRequestDTO {
    private String name;
    private String location;
    private String description;
    private double pricePerNight;
    private List<String> amenities;
    private int totalRooms;
}