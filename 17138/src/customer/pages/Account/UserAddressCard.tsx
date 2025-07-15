import React from 'react';
import { Edit, Delete, LocationOn } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';

type AddressProps = {
  name: string;
  mobile: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  type?: 'Home' | 'Work' | string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const UserAddressCard = ({
  name,
  mobile,
  addressLine,
  city,
  state,
  pincode,
  type = 'Home',
  onEdit,
  onDelete,
}: AddressProps) => {
  return (
    <Box className="flex justify-between items-start bg-slate-50 p-5 rounded-xl shadow-md hover:shadow-lg">
      <div className="flex gap-3">
        <LocationOn className="text-blue-500 mt-1" />
        <div>
          <p className="font-semibold text-gray-800">{name} ({type})</p>
          <p className="text-sm text-gray-600">
            {addressLine}, {city}, {state} - {pincode}
          </p>
          <p className="text-sm text-gray-600">Mobile: {mobile}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <IconButton color="primary" onClick={onEdit}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={onDelete}>
          <Delete />
        </IconButton>
      </div>
    </Box>
  );
};

export default UserAddressCard;
