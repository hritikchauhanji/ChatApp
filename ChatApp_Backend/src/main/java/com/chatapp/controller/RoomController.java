package com.chatapp.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.config.AppConstants;
import com.chatapp.entities.Message;
import com.chatapp.entities.Room;
import com.chatapp.repository.RoomRepository;
@RestController
@RequestMapping("api/v1/rooms")
@CrossOrigin(AppConstants.Frontend_Base_URL)
public class RoomController {
	
	@Autowired
	private RoomRepository roomRepository;

	@PostMapping("/save")
	ResponseEntity<?> createRoom(@RequestBody String roomId) {
		if (roomRepository.findByRoomId(roomId) != null) {
			//room is already exists
			return ResponseEntity.badRequest().body("room is already exist");
		}
		
		// create new room
		
		Room room = new Room();
		room.setRoomId(roomId);
		roomRepository.save(room);
		return ResponseEntity.status(HttpStatus.CREATED).body(room);
	}
	
	@GetMapping("/{roomId}")
	ResponseEntity<?> joinRoom(@PathVariable String roomId) {
		
		Room room = roomRepository.findByRoomId(roomId);
		
		if(room == null) {
			return ResponseEntity.badRequest().body("room is not found");
		}
		
		return ResponseEntity.ok(room);
	}
	
	//get message in room
	@GetMapping("/{roomId}/messages")
	ResponseEntity<?> getMessages(
			@PathVariable String roomId,
			@RequestParam(value = "page" , defaultValue = "0" , required = false) int page,
			@RequestParam(value = "size", defaultValue = "20", required = false) int size
			) {
		Room room = roomRepository.findByRoomId(roomId);
		
		if(room == null) {
			return ResponseEntity.badRequest().build();
		}
		
		//get messages 
		List<Message> messages = room.getMessages();
		
		//pagination
		
		int start = Math.max(0,messages.size() - (page + 1) * size);
		
		int end = Math.min(messages.size(), start + size);
		
		List<Message> paginatedMessages = messages.subList(start, end);
		
		
		return ResponseEntity.ok(paginatedMessages);
	}
}
