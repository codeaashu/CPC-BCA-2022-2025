package com.travelhub.pritam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.travelhub.pritam.dto.AdminDashboardStatsDTO;
import com.travelhub.pritam.dto.BookingResponseDTO;
import com.travelhub.pritam.dto.HotelResponseDTO;
import com.travelhub.pritam.dto.UserResponseDTO;
import com.travelhub.pritam.service.AdminService;
import com.travelhub.pritam.service.BookingService;
import com.travelhub.pritam.service.HotelService;
import com.travelhub.pritam.service.IUserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private BookingService bookingService;
	
	@GetMapping("/users")
	public List<UserResponseDTO> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@GetMapping("/hotels")
	public List<HotelResponseDTO> getAllHotels(){
		return hotelService.getAllHotels();
	}
	
	 @PostMapping("/users/{id}/block")
	    public UserResponseDTO blockUser(@PathVariable Long id) {
	        return userService.blockUser(id);
	    }

	    @PostMapping("/users/{id}/unblock")
	    public UserResponseDTO unblockUser(@PathVariable Long id) {
	        return userService.unblockUser(id);
	    }
	    
	    @PostMapping("/hotels/{id}/status")
	    public HotelResponseDTO updateHotelStatus(@PathVariable Long id, @RequestParam boolean active) {
	        System.out.println("\n\n Status Updated");
	    	return hotelService.updateHotelStatus(id, active);
	    }
	    
	    @GetMapping("/dashboard")
	    public AdminDashboardStatsDTO getDashboardStats() {
	        return adminService.getDashboardStats();
	    }
	    
	    @GetMapping("/sellers")
		public List<UserResponseDTO> getAllSellers(){
			return userService.getAllSellers();
		}
	    
	    @GetMapping("/buyers")
		public List<UserResponseDTO> getAllBuyers(){
			return userService.getAllBuyers();
		}
	    
	    @GetMapping("/bookings")
	    public List<BookingResponseDTO> getAllBookings(){
	    	return bookingService.getAllBookings();
	    }
	    
	    @GetMapping("/hotels/approved")
	    public List<HotelResponseDTO> getApprovedHotels() {
	        return hotelService.getApprovedHotels();
	    }

	    // ✅ Get all pending/unapproved hotels
	    @GetMapping("/hotels/pending")
	    public List<HotelResponseDTO> getPendingHotels() {
	        return hotelService.getPendingApprovalHotels();
	    }

	
	
}
