package com.dollop.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dollop.app.dto.TicketDto;
import com.dollop.app.service.impl.TicketImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/ticket")
public class TicketController {

	@Autowired 
	private TicketImpl ticketImpl;
	
	@PostMapping("/create")
	public ResponseEntity<?> createTicket(@Valid @RequestBody TicketDto dto ){
		TicketDto dto2 = ticketImpl.createTicket(dto);
		return ResponseEntity.ok(dto2);
	}
	
	@GetMapping("/get/{id}")
	public ResponseEntity<List<TicketDto>> getTicket(@PathVariable Integer id){
		return ResponseEntity.ok(ticketImpl.getTicket(id));
	}
	
	@GetMapping("/csr/get/{id}")
	public ResponseEntity<List<TicketDto>> getTicketByCsr(@PathVariable Integer id){
		return ResponseEntity.ok(ticketImpl.getTicket(id));
	}
	
	@GetMapping("/{id}/{status}")
	public ResponseEntity<?> getTicketByStatus(@PathVariable Integer id ,@PathVariable String status){
		return ResponseEntity.ok(ticketImpl.getTicketByStatus(id,status));
	}
	
	@GetMapping("/filter/{date}")
	public ResponseEntity<?> filterWise(@PathVariable LocalDate date){
		return ResponseEntity.ok(ticketImpl.getTicketBycreatedAt(date));
	
	}
}
