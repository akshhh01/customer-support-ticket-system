package com.dollop.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dollop.app.enums.UserRole;
import com.dollop.app.model.Users;

public interface IUserRepository extends JpaRepository<Users, Integer>{
	
	boolean existsByRole(UserRole role);
	boolean existsByEmail(String email);
	Optional<Users> findByEmail(String email);
//Optional<Users> findByName(String name);
//	
}
