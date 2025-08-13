package com.dollop.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dollop.app.model.Comments;
import com.dollop.app.model.Ticket;

public interface ICommentsRepository extends JpaRepository<Comments, Integer>{

	List<Comments> findByTicket(Ticket ticket);
	List<Comments> findByCreatedAtBefore(LocalDate createdAt);;
}
