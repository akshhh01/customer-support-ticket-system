package com.dollop.app.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
  
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String subject;

	private String description;

	
	private TicketPriority priority;

	@ManyToOne
	private Users createdBy;

	@ManyToOne
	private Users assignedTo;

	@Temporal(TemporalType.DATE)
	private LocalDate createdAt ;
	
	private TicketStatus status;
}

	
	


