package com.travelhub.pritam.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.travelhub.pritam.dto.BookingRequestDTO;
import com.travelhub.pritam.dto.BookingResponseDTO;
import com.travelhub.pritam.dto.PaymentResponseDTO;
import com.travelhub.pritam.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class BookingController {
	
	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/hotel")
	@PreAuthorize("hasRole('BUYER') or hasRole('SELLER')")
	public PaymentResponseDTO bookHotel(@RequestBody BookingRequestDTO request) {
	    String username = SecurityContextHolder.getContext().getAuthentication().getName();
	    bookingService.bookHotel(username, request);

	    PaymentResponseDTO resp = new PaymentResponseDTO();
	    resp.setMessage("Payment Done Successfully");
	    resp.setStatus("PENDING");
	    Long val = Math.round(new Random().nextFloat() * Math.pow(10, 12));
	    resp.setTransactionId(val.toString());

	    return resp;
	}

	
	@GetMapping("/my-bookings")
	@PreAuthorize("hasRole('BUYER') or hasRole('SELLER')")
	public List<BookingResponseDTO> getMyBookings(){
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return bookingService.getUserBookings(username);
	}

}
