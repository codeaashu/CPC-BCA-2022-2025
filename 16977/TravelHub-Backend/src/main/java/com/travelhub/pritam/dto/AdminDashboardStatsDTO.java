package com.travelhub.pritam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardStatsDTO {
	private long totalUsers;
    private long totalSellers;
    private long totalBuyers;
    private long totalHotels;
    private long approvedHotels;
    private long pendingHotels;
    private long totalBookings;
}
