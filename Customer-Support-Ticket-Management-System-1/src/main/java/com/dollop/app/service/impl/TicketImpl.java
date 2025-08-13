package com.dollop.app.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dollop.app.dto.TicketDto;
import com.dollop.app.enums.UserRole;
import com.dollop.app.exceptions.ResourceNotFoundException;
import com.dollop.app.mapper.TicketMapper;
import com.dollop.app.model.Ticket;
import com.dollop.app.model.TicketStatus;
import com.dollop.app.model.Users;
import com.dollop.app.repository.ITicketRepository;
import com.dollop.app.repository.IUserRepository;
import com.dollop.app.service.interfaces.ITicketDao;

@Service
public class TicketImpl implements ITicketDao {

	@Autowired
	private ITicketRepository ticketRepository;
	@Autowired
	private TicketMapper ticketMapper;
	@Autowired
	private IUserRepository userRepository;

	@Override
	public TicketDto createTicket(TicketDto dto) {
		// TODO Auto-generated method stub
		Ticket ticket = ticketMapper.toEntity(dto);
		ticket.setCreatedBy(userRepository.findById(dto.getCreatedBy())
				.orElseThrow(() -> new ResourceNotFoundException("invalid user ")));
		ticket.setCreatedAt(LocalDate.now());
		return ticketMapper.toDto(ticketRepository.save(ticket));
	}

	@Override
	public List<TicketDto> getTicket(Integer id) {
		// TODO Auto-generated method stub
		Users user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("use dont have this access"));
		if (user.getRole().equals(UserRole.CUSTOMER)) {
			List<Ticket> tickets = ticketRepository.findByCreatedBy(user);
			List<TicketDto> ticketDtos = new ArrayList<>();
			if (!tickets.isEmpty()) {
				for (Ticket ticket : tickets) {
					ticketDtos.add(ticketMapper.toDto(ticket));
				}
				return ticketDtos;
			}
			return ticketDtos;
		} else if (user.getRole().equals(UserRole.CSR)) {
			List<Ticket> tickets = ticketRepository.findByAssignedTo(user);
			List<TicketDto> ticketDtos = new ArrayList<>();
			if (!tickets.isEmpty()) {
				for (Ticket ticket : tickets) {
					ticketDtos.add(ticketMapper.toDto(ticket));
				}
				return ticketDtos;
			}
			return ticketDtos;
		} else {
			List<Ticket> tickets = ticketRepository.findAll();
			List<TicketDto> ticketDtos = new ArrayList<>();
			if (!tickets.isEmpty()) {
				for (Ticket ticket : tickets) {
					ticketDtos.add(ticketMapper.toDto(ticket));
				}
				return ticketDtos;
			}
			return ticketDtos;
		}
	}
	
	public List<TicketDto> getTicketByStatus(Integer userId , String status){
		Users user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("use dont have this access"));
		TicketStatus s1 =  TicketStatus.valueOf(status);
		if (user.getRole().equals(UserRole.CUSTOMER)) {
			List<Ticket> tickets = ticketRepository.findByStatusAndCreatedBy(s1 , user);
			List<TicketDto> ticketDtos = new ArrayList<>();
			if (!tickets.isEmpty()) {
				for (Ticket ticket : tickets) {
					ticketDtos.add(ticketMapper.toDto(ticket));
				}
				return ticketDtos;
			}
			return ticketDtos;
		} else if (user.getRole().equals(UserRole.CSR)) {
			List<Ticket> tickets = ticketRepository.findByStatusAndAssignedTo(s1,user);
			List<TicketDto> ticketDtos = new ArrayList<>();
			if (!tickets.isEmpty()) {
				for (Ticket ticket : tickets) {
					ticketDtos.add(ticketMapper.toDto(ticket));
				}
				return ticketDtos;
			}
			return ticketDtos;
		} else {
			List<Ticket> tickets = ticketRepository.findByStatus(s1);
			List<TicketDto> ticketDtos = new ArrayList<>();
			if (!tickets.isEmpty()) {
				for (Ticket ticket : tickets) {
					ticketDtos.add(ticketMapper.toDto(ticket));
				}
				return ticketDtos;
			}
			return ticketDtos;
		}
	}
	
	public List<TicketDto> getTicketBycreatedAt(LocalDate date){
		List<Ticket> tickets = ticketRepository.findByCreatedAtBefore(date);
		System.err.println(tickets);
		return tickets.stream().map(ticket -> ticketMapper.toDto(ticket)).collect(Collectors.toList());
	}

}
