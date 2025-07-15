package com.ecomproject.service.impl;

import com.ecomproject.domain.HomeCategorySection;
import com.ecomproject.model.Deal;
import com.ecomproject.model.Home;
import com.ecomproject.model.HomeCategory;
import com.ecomproject.repository.DealRepository;
import com.ecomproject.service.HomeService;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService{

    private final DealRepository dealRepository;

    @Override
    public Home createHomePageData(List<HomeCategory> allCategories) {

        List<HomeCategory> gridCategories = allCategories.stream()
                .filter(homeCategory ->
                        homeCategory.getSection() == HomeCategorySection.GRID)
                .collect(Collectors.toList());

        List<HomeCategory> shopByCategories = allCategories.stream()
                .filter(homeCategory ->
                        homeCategory.getSection() == HomeCategorySection.SHOP_BY_CATEGORIES)
                .collect(Collectors.toList());

        List<HomeCategory> electricCategories = allCategories.stream()
                .filter(homeCategory ->
                            homeCategory.getSection() == HomeCategorySection.ELECTRIC_CATEGORIES)
                .collect(Collectors.toList());

        List<HomeCategory> dealCategories = allCategories.stream()
                .filter(homeCategory ->
                        homeCategory.getSection() == HomeCategorySection.DEALS)
                .toList();

        List<Deal> createdDeals = new ArrayList<>();

        if (dealRepository.findAll().isEmpty()){
            List<Deal> deals = allCategories.stream()
                    .filter(homeCategory ->
                            homeCategory.getSection() == HomeCategorySection.DEALS)
                    .map(homeCategory -> new Deal(null,10,homeCategory))
                    .collect(Collectors.toList());
            createdDeals = dealRepository.saveAll(deals);

        }else createdDeals = dealRepository.findAll();

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShopByCategories(shopByCategories);
        home.setElectricCategories(electricCategories);
        home.setDeals(createdDeals);
        home.setDealCategories(dealCategories);

        return home;
    }
}
