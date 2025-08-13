package com.dollop.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dollop.app.model.Ticket;

import java.time.LocalDate;
import java.util.List;
import com.dollop.app.model.Users;
import com.dollop.app.model.TicketStatus;



public interface ITicketRepository  extends JpaRepository<Ticket, Integer>{
	List<Ticket> findByCreatedBy(Users createdBy);
	List<Ticket> findByAssignedTo(Users assignedTo);
	List<Ticket> findByStatusAndAssignedTo(TicketStatus status, Users assignedTo);
	List<Ticket> findByStatusAndCreatedBy(TicketStatus status, Users createdBy);
	List<Ticket> findByStatus(TicketStatus status);
	List<Ticket> findByCreatedAtBefore(LocalDate date);
	

}
