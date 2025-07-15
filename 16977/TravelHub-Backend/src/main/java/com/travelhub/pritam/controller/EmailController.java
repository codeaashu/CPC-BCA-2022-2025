package com.travelhub.pritam.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.travelhub.pritam.dto.BookingRequestDTO;
import com.travelhub.pritam.dto.EmailRequestDTO;
import com.travelhub.pritam.dto.PaymentResponseDTO;
import com.travelhub.pritam.service.EmailService;

@RestController
@RequestMapping("/api/mail")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class EmailController {
	@Autowired
	private EmailService emailService;
	
	@PostMapping("/send")
    @PreAuthorize("hasRole('BUYER') or hasRole('SELLER')")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequestDTO request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String from = "pritamkumar2865@gmail.com"; // use spring.mail.username value or inject from properties

        try {
            emailService.sendEmail("mailforsurfingpritam7033@gmail.com", request.getSubject(), request.getBody());

            Map<String, Object> resp = new HashMap<>();
            resp.put("message", "Email sent successfully");
            resp.put("status", "SENT");
            
            resp.put("to", "support@travelhub.com");
            resp.put("byUser", username);

            return ResponseEntity.ok(resp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Failed to send email", "error", e.getMessage()));
        }
    }
	
	
}
