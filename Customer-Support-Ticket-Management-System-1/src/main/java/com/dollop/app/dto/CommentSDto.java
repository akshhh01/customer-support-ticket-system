package com.dollop.app.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class CommentSDto {
	
	private Integer id;

	@NotBlank(message = "content is required")
    @Size(max = 50, message = "Subject must be less than 50 characters")
	private String comments;
;
   
	@NotNull(message = "ticket must be required")
	private Integer ticketId;

	@NotNull(message = "user must be required")
	private Integer userId;

	@Temporal(TemporalType.DATE)
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate createdAt = LocalDate.now();

}
