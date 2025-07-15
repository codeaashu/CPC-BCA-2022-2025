package com.travelhub.pritam.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travelhub.pritam.dto.HotelRequestDTO;
import com.travelhub.pritam.dto.HotelResponseDTO;
import com.travelhub.pritam.model.Hotel;
import com.travelhub.pritam.model.Role;
import com.travelhub.pritam.model.User;
import com.travelhub.pritam.repository.UserRepository;
import com.travelhub.pritam.service.HotelService;
import com.travelhub.pritam.service.IUserService;
import com.travelhub.pritam.utility.ConversionUtility;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class HotelController {
	
	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private ConversionUtility conversionUtility;
	
	 @GetMapping("/search")
	    public ResponseEntity<List<HotelResponseDTO>> searchHotels(@RequestParam("location") String location) {
		 List<HotelResponseDTO> hotelDTOs = hotelService.searchHotels(location);

	        return ResponseEntity.ok(hotelDTOs);
	    }
	 @GetMapping("/{id}")
	    public ResponseEntity<HotelResponseDTO> getHotel(@PathVariable("id") Long id) {
	        Hotel hotel = hotelService.getHotelById(id);
	        if (hotel == null) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	        }
	        HotelResponseDTO hotelDTO = conversionUtility.mapToHotelResponseDTO(hotel);
	        return ResponseEntity.ok(hotelDTO);
	    }
	 	@PostMapping("/add")
	    @PreAuthorize("hasRole('SELLER')")
	    public ResponseEntity<HotelResponseDTO> addHotel(
	    		@RequestBody HotelRequestDTO hotelDTO
	                                                     ) {
	 		String username = SecurityContextHolder.getContext().getAuthentication().getName();
	        User seller = userService.getByUsername(username)
	                .orElseThrow(() -> new UsernameNotFoundException("Seller not found"));

	        if (seller.getRole() != Role.SELLER) {
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
	        }

	        // Convert DTO to Hotel entity
	        Hotel hotel = new Hotel();
	        hotel.setName(hotelDTO.getName());
	        hotel.setLocation(hotelDTO.getLocation());
	        hotel.setDescription(hotelDTO.getDescription());
	        hotel.setPricePerNight(hotelDTO.getPricePerNight());
	        hotel.setAmenities(hotelDTO.getAmenities());
	        hotel.setAvailableRooms(hotelDTO.getTotalRooms());
	        hotel.setSeller(seller); // Associate with seller

	        Hotel savedHotel = hotelService.saveHotel(hotel);
	        HotelResponseDTO responseDTO = conversionUtility.mapToHotelResponseDTO(savedHotel);

	        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
	    }
	 	
	 	@GetMapping("/all")
	 	public List<HotelResponseDTO> getAllHotels() {
	 	    return hotelService.getAllHotels();
	 	}
	 	
	 	@GetMapping("/seller")
	    @PreAuthorize("hasRole('SELLER')")
	    public List<HotelResponseDTO> getSellerHotel() {
	 		String username = SecurityContextHolder.getContext().getAuthentication().getName();
	        User seller = userService.getByUsername(username)
	                .orElseThrow(() -> new UsernameNotFoundException("Seller not found"));
	        return hotelService.getHotelBySellerId(seller.getId());

	       
	 	}

}
