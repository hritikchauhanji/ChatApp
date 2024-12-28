package com.chatapp.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


//import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.CascadeType;
//import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
//import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@Document(collection = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rooms")
public class Room {

	@Id
	private String id; /*= UUID.randomUUID().toString(); Generate a unique ID*/

	private String roomId;

	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true, fetch = FetchType.EAGER) // Persist messages with the Room
	private List<Message> messages = new ArrayList<>();

	@PrePersist
	public void prePersist() {
		if (this.id == null || this.id.isEmpty()) {
			this.id = UUID.randomUUID().toString();
		}
	}
}
