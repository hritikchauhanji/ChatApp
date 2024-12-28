package com.chatapp.entities;

import java.time.LocalDateTime;

//import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String sender;

	private String content;

	private LocalDateTime timeStamp;


	public Message(String sender, String content) {
		super();
		this.sender = sender;
		this.content = content;
		this.timeStamp = LocalDateTime.now();
	}

}
