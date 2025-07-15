package com.travelhub.pritam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelhub.pritam.dto.AdminDashboardStatsDTO;
import com.travelhub.pritam.model.Role;
import com.travelhub.pritam.repository.BookingRepository;
import com.travelhub.pritam.repository.HotelRepository;
import com.travelhub.pritam.repository.UserRepository;

@Service
public class AdminService {

	

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public AdminDashboardStatsDTO getDashboardStats() {
        AdminDashboardStatsDTO stats = new AdminDashboardStatsDTO();

        stats.setTotalUsers(userRepository.count());
        stats.setTotalSellers(userRepository.countByRole(Role.SELLER));
        stats.setTotalBuyers(userRepository.countByRole(Role.BUYER));

        stats.setTotalHotels(hotelRepository.count());
        stats.setApprovedHotels(hotelRepository.countByApproved(true));
        stats.setPendingHotels(hotelRepository.countByApproved(false));

        stats.setTotalBookings(bookingRepository.count());

        return stats;
    }
}
