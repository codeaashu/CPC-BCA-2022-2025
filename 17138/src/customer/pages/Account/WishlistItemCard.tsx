import React from 'react';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface WishlistItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  onRemove: () => void;
  onAddToCart: () => void;
}

const WishlistItemCard: React.FC<WishlistItemProps> = ({ product, onRemove, onAddToCart }) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-blue-600 font-bold mt-1">₹{product.price.toFixed(2)}</p>
        <div className="mt-3 flex gap-3">
          <Button variant="contained" size="small" onClick={onAddToCart}>
            Add to Cart
          </Button>
          <IconButton onClick={onRemove} color="error" size="small" aria-label="Remove from wishlist">
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default WishlistItemCard;
