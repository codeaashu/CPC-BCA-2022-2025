import React, { useEffect, useState } from 'react';
import WishlistItemCard from './WishlistItemCard'; // adjust path as needed

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

const mockWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 2499,
    image: "https://via.placeholder.com/100?text=Headphones",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 4999,
    image: "https://via.placeholder.com/100?text=Fitness+Watch",
  },
  {
    id: 3,
    name: "Portable Charger 10000mAh",
    price: 1299,
    image: "https://via.placeholder.com/100?text=Charger",
  },
];

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    setWishlist(mockWishlist);
  }, []);

  const handleRemove = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: number) => {
    console.log("Add to Cart", id);
  };

  return (
    <div className="py-10 px-5 lg:px-20">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h2>
      <div className="space-y-4">
        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          wishlist.map(item => (
            <WishlistItemCard
              key={item.id}
              product={item}
              onRemove={() => handleRemove(item.id)}
              onAddToCart={() => handleAddToCart(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
