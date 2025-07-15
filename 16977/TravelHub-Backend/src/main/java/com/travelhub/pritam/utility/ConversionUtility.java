package com.travelhub.pritam.utility;

import org.springframework.stereotype.Component;

import com.travelhub.pritam.dto.HotelResponseDTO;
import com.travelhub.pritam.dto.UserResponseDTO;
import com.travelhub.pritam.model.Hotel;
import com.travelhub.pritam.model.User;

@Component
public class ConversionUtility {
	
	
	public HotelResponseDTO mapToHotelResponseDTO(Hotel hotel) {
	    HotelResponseDTO dto = new HotelResponseDTO();
	    dto.setId(hotel.getId());
	    dto.setName(hotel.getName());
	    dto.setLocation(hotel.getLocation());
	    dto.setDescription(hotel.getDescription());
	    dto.setPricePerNight(hotel.getPricePerNight());
	    dto.setAmenities(hotel.getAmenities());
	    dto.setTotalRooms(hotel.getAvailableRooms());
	    dto.setSellerUsername(hotel.getSeller().getUsername());
	    return dto;
	}
	public UserResponseDTO mapToUserResponseDTO(User user) {
		UserResponseDTO response = new UserResponseDTO();
		response.setActive(user.isActive());
		response.setEmail(user.getEmail());
		response.setId(user.getId());
		response.setRole(user.getRole().name());
		response.setUsername(user.getUsername());
		return response;
	}
}
