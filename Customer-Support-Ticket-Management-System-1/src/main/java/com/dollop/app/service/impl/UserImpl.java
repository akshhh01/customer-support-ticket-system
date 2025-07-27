package com.dollop.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.dollop.app.dto.LogIn;
import com.dollop.app.dto.UsersDto;
import com.dollop.app.enums.UserRole;
import com.dollop.app.exceptions.ResourceNotFoundException;
import com.dollop.app.model.Users;
import com.dollop.app.repository.IUserRepository;
import com.dollop.app.service.interfaces.IUserDao;

@Service
public class UserImpl implements IUserDao , UserDetailsService{
	@Autowired
	private IUserRepository repository;
    @Autowired 
    private ModelMapper mapper;
    @Autowired
	private BCryptPasswordEncoder passwordEncoder;
//    private final AuthenticationManager authenticationManager;
//    private final JwtTokenUtils jwtUtil;
//
//    public UserImpl(AuthenticationManager authenticationManager, JwtTokenUtils jwtUtil) {
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//    }
    
    
    
    
    public Users addAdmin() {
    	Users user = new Users();
    	user.setEmail("akshat123@gmail.com");
    	user.setMobile("9516349605");
    	user.setName("Akshat gupta");
    	user.setPassword(passwordEncoder.encode("123456"));
    	user.setRole(UserRole.ADMIN);
    	return repository.save(user);
    }
    
	@Override

	public Users logIn(LogIn logIn) {
	    if (!repository.existsByRole(UserRole.ADMIN)) {
	        addAdmin();
	    }

	    Users user = repository.findByEmail(logIn.getEmail())
	        .orElseThrow(() -> new ResourceNotFoundException("User not found, Invalid Email"));
	    if (passwordEncoder.matches(logIn.getPassword(), user.getPassword())) {
	        return user;
	    }
	    throw new ResourceNotFoundException("Wrong password");
	}


	@Override
	public UsersDto register(UsersDto user){
		// TODO Auto-generated method stub
		if(!repository.existsByRole(UserRole.ADMIN)) {
			System.out.println(user);
			addAdmin();
		}
		if(repository.existsByEmail(user.getEmail())) { 
			throw new ResourceNotFoundException("email already exist :");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		System.out.println(user);
		Users user1 = mapper.map(user, Users.class);
			return  mapper.map(repository.save(user1) , UsersDto.class);
	}
	
	public List<UsersDto> getAll(){
		List<Users> users = repository.findAll();
		
		List<UsersDto> dtos= new ArrayList<>();
		if(!users.isEmpty()) {
			for(Users user : users) {
				System.out.println(user);
				dtos.add(mapper.map(user, UsersDto.class));
				System.out.println(dtos);
			}
			return dtos;
		}
		throw new ResourceNotFoundException("no have any user ");
	}


	 @Override
	    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {	        
//		 System.out.println("loadUserByUsername"+email);
		 Users user = repository.findByEmail(email)
	                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
//	        List<GrantedAuthority> authorities = user.getRole().stream()
//		            .map(role -> new SimpleGrantedAuthority(role.name())) // Assuming getR() returns the role name
//		            .collect(Collectors.toList());
	        return org.springframework.security.core.userdetails.User
	                .withUsername(user.getEmail())
	                .password(user.getPassword())
	                .roles(user.getRole().name())
	                .build();
	    }




	
	
}
