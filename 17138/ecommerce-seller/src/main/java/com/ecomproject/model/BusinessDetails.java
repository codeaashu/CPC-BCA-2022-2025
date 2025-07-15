package com.ecomproject.model;


import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BusinessDetails {

    private String businessName;
    private String businessAddress;
    private String businessEmail;
    private String businessMobile;
    private String logo;
    private String banner;
}
