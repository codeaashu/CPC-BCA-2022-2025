package com.jobportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobportal.dao.AddressDao;
import com.jobportal.entity.Address;

@Service
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	private AddressDao addressDao;

	@Override
	public Address addUserAddress(Address address) {
		return addressDao.save(address);
	}

}
