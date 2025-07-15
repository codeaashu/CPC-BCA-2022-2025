package com.ecomproject.service.impl;

import com.ecomproject.model.Deal;
import com.ecomproject.model.HomeCategory;
import com.ecomproject.repository.DealRepository;
import com.ecomproject.repository.HomeCategoryRepository;
import com.ecomproject.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;
    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public List<Deal> getDeals() {
        return dealRepository.findAll();
    }

    @Override
    public Deal createDeal(Deal deal) {

        HomeCategory homeCategory = homeCategoryRepository.findById(deal.getId()).orElse(null);

        Deal newDeal  = dealRepository.save(deal);
        newDeal.setCategory(homeCategory);
        newDeal.setDiscount(deal.getDiscount());
        return dealRepository.save(newDeal);
    }

    @Override
    public Deal updateDeal(Deal deal,Long id) throws Exception {
        Deal exitingDeal = dealRepository.findById(id).orElse(null);
        HomeCategory homeCategory = homeCategoryRepository.findById(deal.getCategory().getId()).orElse(null);

        if (exitingDeal!=null){
            if (deal.getDiscount()!=null) {
                exitingDeal.setDiscount(deal.getDiscount());
            }
            if (homeCategory!=null) {
                exitingDeal.setCategory(homeCategory);
            }
            return dealRepository.save(exitingDeal);
        }
        throw new Exception("Deal Not Found..!!");
    }

    @Override
    public void deleteDeal(Long id) throws Exception {
        Deal deal = dealRepository.findById(id).orElseThrow(()->
                new Exception("Deal Not Found..!!"));
        dealRepository.delete(deal);
    }
}
