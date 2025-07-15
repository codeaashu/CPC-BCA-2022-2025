package com.travelhub.pritam.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestDTO {
	private Long hotelId;
    private String checkInDate;
    private String checkOutDate;
    private int numGuests;
   
}
