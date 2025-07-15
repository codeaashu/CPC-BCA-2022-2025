package com.travelhub.pritam.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelhub.pritam.dto.BookingRequestDTO;
import com.travelhub.pritam.dto.BookingResponseDTO;
import com.travelhub.pritam.model.Booking;
import com.travelhub.pritam.model.BookingStatus;
import com.travelhub.pritam.model.Hotel;
import com.travelhub.pritam.model.User;
import com.travelhub.pritam.repository.BookingRepository;
import com.travelhub.pritam.repository.HotelRepository;
import com.travelhub.pritam.repository.UserRepository;

@Service
public class BookingServiceImpl implements BookingService {
	
	
	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private HotelRepository hotelRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public BookingResponseDTO bookHotel(String username, BookingRequestDTO request) {
		User user = userRepository.findByUsername(username).orElseThrow(()->new RuntimeException("User not found"));
		
		Hotel hotel = hotelRepository.findById(request.getHotelId()).orElseThrow(()-> new RuntimeException("Hotel not found"));
		
		Booking booking = new Booking();
		booking.setHotel(hotel);
		booking.setUser(user);
		String checkInStr = request.getCheckInDate();
		String checkOutStr = request.getCheckOutDate();
		booking.setCheckInDate(LocalDate.parse(checkInStr));
		booking.setCheckOutDate(LocalDate.parse(checkOutStr));
		booking.setNumGuests(request.getNumGuests());
		booking.setStatus(BookingStatus.PENDING);
		
		Booking savedBooking = bookingRepository.save(booking);
		
		BookingResponseDTO response = new BookingResponseDTO();
		
		response.setBookingId(savedBooking.getId());
		response.setHotelName(hotel.getName());
		response.setCheckInDate(savedBooking.getCheckInDate());
		response.setCheckOutDate(savedBooking.getCheckOutDate());
		response.setNumGuests(savedBooking.getNumGuests());
		response.setStatus(savedBooking.getStatus().name());
		
		return response;
	}

	@Override
	public List<BookingResponseDTO> getUserBookings(String username) {
		User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
		
		return bookingRepository.findByUser(user).stream()
				.map(booking-> new BookingResponseDTO(
						booking.getId(),
						booking.getHotel().getName(),
						booking.getCheckInDate(),
						booking.getCheckOutDate(),
						booking.getNumGuests(),
						booking.getStatus().name()
						)).collect(Collectors.toList());
	}

	@Override
	public List<BookingResponseDTO> getAllBookings() {
		return bookingRepository
				.findAll()
				.stream()
				.map(booking-> new BookingResponseDTO(
						booking.getId(),
						booking.getHotel().getName(),
						booking.getCheckInDate(),
						booking.getCheckOutDate(),
						booking.getNumGuests(),
						booking.getStatus().name()
						)).collect(Collectors.toList());
	}

}
