package com.dollop.app.dto;

import java.time.LocalDate;

import com.dollop.app.model.TicketPriority;
import com.dollop.app.model.TicketStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketDto {

    private Integer id;

    @NotBlank(message = "Subject is required")
    @Size(max = 100, message = "Subject must be less than 100 characters")
    private String subject;

    @NotBlank(message = "Description is required")
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    @NotNull(message = "Priority must be specified")
    @Enumerated(EnumType.STRING)
    private TicketPriority priority;


    @NotNull(message = "CreatedBy user must be specified")
    private Integer createdBy;

    private Integer assignedTo;


	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate createdAt = LocalDate.now();
    
    @Enumerated(EnumType.STRING)
    private TicketStatus status;

}
