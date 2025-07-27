package com.dollop.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dollop.app.model.Ticket;
import java.util.List;
import com.dollop.app.model.Users;


public interface ITicketRepository  extends JpaRepository<Ticket, Integer>{
	List<Ticket> findByCreatedBy(Users createdBy);
	List<Ticket> findByAssignedTo(Users assignedTo);
	

}
