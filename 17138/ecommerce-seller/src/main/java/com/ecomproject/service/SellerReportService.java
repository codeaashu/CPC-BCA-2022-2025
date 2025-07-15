package com.ecomproject.service;

import com.ecomproject.model.Seller;
import com.ecomproject.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller sellerId);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
