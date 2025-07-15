package com.ecomproject.service.impl;

import java.util.List;

import com.ecomproject.model.HomeCategory;
import com.ecomproject.repository.HomeCategoryRepository;
import com.ecomproject.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService{

    private final HomeCategoryRepository homeCategoryRepository;

    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
        if (homeCategories.isEmpty()) {
            return homeCategoryRepository.saveAll(homeCategories);
            
        }
        return homeCategoryRepository.findAll();
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
        HomeCategory existingCategory = homeCategoryRepository.findById(id)
                .orElseThrow(() -> new Exception("HomeCategory not found with id: " + id));

                if (homeCategory.getImage() != null) {
                    existingCategory.setImage(homeCategory.getImage()); 
                }
                if (homeCategory.getCategoryId() != null) {
                    existingCategory.setCategoryId(homeCategory.getCategoryId());
                    
                }
                
                return homeCategoryRepository.save(homeCategory);
            }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
