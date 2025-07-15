package com.travelhub.pritam.service;

import java.util.List;

import com.travelhub.pritam.dto.BookingRequestDTO;
import com.travelhub.pritam.dto.BookingResponseDTO;

public interface BookingService {
	BookingResponseDTO bookHotel(String username, BookingRequestDTO request);
	List<BookingResponseDTO> getUserBookings(String username);
	List<BookingResponseDTO> getAllBookings();
}
