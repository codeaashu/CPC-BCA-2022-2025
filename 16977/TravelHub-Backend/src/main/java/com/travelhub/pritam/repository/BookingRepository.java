package com.travelhub.pritam.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelhub.pritam.model.Booking;
import com.travelhub.pritam.model.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	List<Booking> findByUser(User user);
}
