package com.ecomproject.response;

import lombok.Data;

@Data
public class PaymentLinkResponse {

    private String paymentLinkUrl;
    private String paymentLinkId;
}
