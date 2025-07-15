package com.travelhub.pritam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDTO {

	private String status;
	private String transactionId;
	private String message;
	
}
