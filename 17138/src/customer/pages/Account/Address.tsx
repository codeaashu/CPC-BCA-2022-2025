import React from 'react';
import UserAddressCard from './UserAddressCard';
 // adjust path as needed

const dummyAddresses = [
  {
    id: 1,
    name: 'Aarav Sharma',
    mobile: '+91 9876543210',
    addressLine: '501, Green Park Apartments, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400058',
    type: 'Home',
  },
  {
    id: 2,
    name: 'Ishita Mehta',
    mobile: '+91 9123456789',
    addressLine: '14, Riverdale Heights, Sector 21',
    city: 'Chandigarh',
    state: 'Chandigarh',
    pincode: '160022',
    type: 'Work',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    mobile: '+91 9988776655',
    addressLine: 'Plot No. 28, Sai Enclave, Gachibowli',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500032',
    type: 'Home',
  },
  {
    id: 4,
    name: 'Sneha Iyer',
    mobile: '+91 9090909090',
    addressLine: '23, 2nd Cross, Indiranagar',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560038',
    type: 'Work',
  },
];

const Address = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-10 space-y-5">
      <h1 className="text-2xl font-bold text-gray-800 pb-2 border-b border-gray-300">My Addresses</h1>

      {dummyAddresses.map((addr) => (
        <UserAddressCard
          key={addr.id}
          name={addr.name}
          mobile={addr.mobile}
          addressLine={addr.addressLine}
          city={addr.city}
          state={addr.state}
          pincode={addr.pincode}
          type={addr.type}
          onEdit={() => console.log('Edit address', addr.id)}
          onDelete={() => console.log('Delete address', addr.id)}
        />
      ))}
    </div>
  );
};

export default Address;
