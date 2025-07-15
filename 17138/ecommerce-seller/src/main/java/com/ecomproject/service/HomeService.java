package com.ecomproject.service;

import java.util.List;

import com.ecomproject.model.Home;
import com.ecomproject.model.HomeCategory;

public interface HomeService {

    public Home createHomePageData(List<HomeCategory> allCategories);
}
