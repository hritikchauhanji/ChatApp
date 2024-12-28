package com.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

//import org.springframework.data.mongodb.repository.MongoRepository;

import com.chatapp.entities.Room;

public interface RoomRepository extends JpaRepository<Room, String> {

	// get room by roomId
	Room findByRoomId(String roomId);
}
