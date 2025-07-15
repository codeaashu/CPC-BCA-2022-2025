package com.travelhub.pritam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequestDTO {
   
    private String subject;
    private String body;

    // Getters and setters
}
