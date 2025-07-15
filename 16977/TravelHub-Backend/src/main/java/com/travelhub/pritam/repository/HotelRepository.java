package com.travelhub.pritam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelhub.pritam.model.Hotel;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
	List<Hotel> findByLocationContainingIgnoreCase(String location);
	long countByApproved(boolean approved);
	List<Hotel> findByApproved(boolean approved);
	List<Hotel> findBySellerId(Long sellerId);
}
