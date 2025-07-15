package com.travelhub.pritam.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponseDTO {
	private Long bookingId;
    private String hotelName;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int numGuests;
    private String status;
}
