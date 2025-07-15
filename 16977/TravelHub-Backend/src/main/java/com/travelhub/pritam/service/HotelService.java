package com.travelhub.pritam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelhub.pritam.dto.HotelResponseDTO;
import com.travelhub.pritam.model.Hotel;
import com.travelhub.pritam.repository.HotelRepository;
import com.travelhub.pritam.utility.ConversionUtility;

@Service
public class HotelService {
	
	@Autowired
	private HotelRepository hotelRepository;
	
	@Autowired
	private ConversionUtility conversionUtility;
	
	public List<HotelResponseDTO> searchHotels(String location){
		List<Hotel> hotels = hotelRepository.findByLocationContainingIgnoreCase(location);
		List<HotelResponseDTO> hotelDTOs = hotels.stream()
                .map(conversionUtility::mapToHotelResponseDTO)
                .collect(Collectors.toList());
		return hotelDTOs;
	}
	public Hotel getHotelById(Long id) {
		return hotelRepository.findById(id).orElseThrow(()-> new RuntimeException("Hotel not found"));
	}
	public Hotel saveHotel(Hotel hotel) {
		return hotelRepository.save(hotel);
	}
	public List<HotelResponseDTO> getAllHotels() {
	    List<Hotel> hotels = hotelRepository.findAll();
	    return hotels.stream()
	                 .map(conversionUtility::mapToHotelResponseDTO)
	                 .collect(Collectors.toList());
	}
	
	public HotelResponseDTO updateHotelStatus(Long hotelId, boolean approved) {
	    Hotel hotel = hotelRepository.findById(hotelId).orElseThrow();
	    hotel.setApproved(approved);
	    hotel = hotelRepository.save(hotel);
	    return  conversionUtility.mapToHotelResponseDTO(hotel);
	}
	
	public List<HotelResponseDTO> getApprovedHotels() {
		List<Hotel> hotels = hotelRepository.findByApproved(true);
	    return hotels.stream()
	                 .map(conversionUtility::mapToHotelResponseDTO)
	                 .collect(Collectors.toList());
	}

	public List<HotelResponseDTO> getPendingApprovalHotels() {
		List<Hotel> hotels = hotelRepository.findByApproved(false);
	    return hotels.stream()
	                 .map(conversionUtility::mapToHotelResponseDTO)
	                 .collect(Collectors.toList());
	}
	public List<HotelResponseDTO> getHotelBySellerId(Long id){
		List<Hotel> hotels = hotelRepository.findBySellerId(id);
		return hotels.stream()
				.map(conversionUtility::mapToHotelResponseDTO)
				.collect(Collectors.toList());
	}
	
}
