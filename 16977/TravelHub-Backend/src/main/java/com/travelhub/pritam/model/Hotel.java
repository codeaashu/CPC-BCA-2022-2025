package com.travelhub.pritam.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hotel {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	 	
	 	
	 	@ManyToOne(fetch = FetchType.LAZY)
	 	@JoinColumn(name = "seller_id", nullable = false)
	 	private User seller;
	 	
	 	@OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
	 	private List<Booking> bookings = new ArrayList<>();
	 	
	 	
	 	@Column(nullable = false)
	 	private boolean approved = true;
	    private String name;
	    private String location;
	    private String description;
	    private Double pricePerNight;
	    
	    @ElementCollection
	    @CollectionTable(name = "hotel_amenities", joinColumns = @JoinColumn(name="hotel_id"))
	    @Column(name = "amenity")
	    private List<String> amenities; // You can convert this to a List<String> later

	    private int availableRooms;
	    private double rating;
}
