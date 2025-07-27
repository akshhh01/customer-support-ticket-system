package com.dollop.app.service.interfaces;

import java.util.List;

import com.dollop.app.dto.TicketDto;

public interface ITicketDao {
	
  TicketDto	createTicket(TicketDto dto);
  TicketDto resolveTicket(Integer id);
  void removeTicket(Integer id);
List<TicketDto> getTicket(Integer id);

}
