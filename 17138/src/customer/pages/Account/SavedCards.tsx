import React from 'react';
import { CreditCard, Delete, Edit } from '@mui/icons-material';
import { IconButton, Box, Divider } from '@mui/material';

const dummyCards = [
  {
    id: 1,
    cardType: 'Visa',
    cardNumber: '**** **** **** 1234',
    nameOnCard: 'Aarav Sharma',
    expiry: '08/27',
  },
  {
    id: 2,
    cardType: 'Mastercard',
    cardNumber: '**** **** **** 5678',
    nameOnCard: 'Aarav Sharma',
    expiry: '01/26',
  },
];

const SavedCards = () => {
  return (
    <div className="flex justify-center py-10 bg-gray-100 min-h-screen">
      <div className="w-full lg:w-[70%] bg-white p-6 rounded-2xl shadow-lg space-y-6">
        <div className="flex items-center pb-4 justify-between border-b border-gray-300">
          <h1 className="text-2xl font-bold text-gray-800">Saved Cards</h1>
        </div>

        <div className="space-y-4">
          {dummyCards.map((card) => (
            <Box key={card.id} className="flex items-center bg-slate-50 p-4 rounded-xl shadow-md hover:shadow-lg justify-between">
              <div className="flex items-center space-x-4">
                <CreditCard className="text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-700">{card.cardType} - {card.cardNumber}</p>
                  <p className="text-sm text-gray-600">Name: {card.nameOnCard}</p>
                  <p className="text-sm text-gray-600">Expiry: {card.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconButton color="primary">
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
                </IconButton>
              </div>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedCards;
