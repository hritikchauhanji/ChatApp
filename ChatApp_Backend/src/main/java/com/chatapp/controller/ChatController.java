package com.chatapp.controller;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.chatapp.config.AppConstants;
import com.chatapp.entities.Message;
import com.chatapp.entities.Room;
import com.chatapp.payload.MessageRequest;
import com.chatapp.repository.RoomRepository;

@Controller
//@CrossOrigin(AppConstants.Frontend_Base_URL)
public class ChatController {

	private RoomRepository roomRepository;

	public ChatController(RoomRepository roomRepository) {
		super();
		this.roomRepository = roomRepository;
	}
	
	@MessageMapping("/sendMessage/{roomId}")
	@SendTo("/topic/room/{roomId}")
	public Message sendMessage(
			@DestinationVariable String roomId,
			@RequestBody MessageRequest request
			) {
		Room room = roomRepository.findByRoomId(request.getRoomId());
		
		Message message = new Message();
		message.setContent(request.getContent());
		message.setSender(request.getSender());
		message.setTimeStamp(LocalDateTime.now());
		
		if (room != null) {
			room.getMessages().add(message);
			roomRepository.save(room);
		} else {
			throw new  RuntimeException("room is not found");
		}
		return message;
	}
	
}
