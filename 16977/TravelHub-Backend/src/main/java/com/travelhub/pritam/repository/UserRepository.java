package com.travelhub.pritam.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.travelhub.pritam.model.Role;
import com.travelhub.pritam.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	long countByRole(Role role);
	List<User> findByRole(Role role);

}
