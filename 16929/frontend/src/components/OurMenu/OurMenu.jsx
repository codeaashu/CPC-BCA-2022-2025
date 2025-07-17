import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../../CartContext/CartContext';
import { FaMinus, FaPlus } from 'react-icons/fa';
import './Om.css';

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'];

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const { cartItems: rawCart, addToCart, updateQuantity, removeFromCart } = useCart();

  const cartItems = rawCart.filter(ci => ci.item);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/items');
        const byCategory = res.data.reduce((acc, item) => {
          const cat = item.category || 'Uncategorized';
          acc[cat] = acc[cat] || [];
          acc[cat].push(item);
          return acc;
        }, {});
        setMenuData(byCategory);
      } catch (err) {
        console.error('Failed to load menu items:', err);
      }
    };
    fetchMenu();
  }, []);

  // helper: find cart entry by product ID
  const getCartEntry = id => cartItems.find(ci => ci.item?._id === id);
  const getQuantity  = id => getCartEntry(id)?.quantity ?? 0;

  // items to display in active category
  const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

  return (
    <div className="bg-gradient-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200">
          <span className="font-dancingscript block text-5xl sm:text-6xl md:text-7xl mb-2">
            Our Exquisite Menu
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-amber-100/80">
            A Symphony of Flavors
          </span>
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm ${
                activeCategory === cat
                  ? 'bg-gradient-to-br from-amber-900/80 to-amber-700/80 border-amber-800 scale-105 shadow-xl shadow-amber-900/30'
                  : 'bg-amber-900/20 border-amber-800/30 text-amber-100/80 hover:bg-amber-800/40 hover:scale-95'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {displayItems.map((item, i) => {
            const cartEntry = getCartEntry(item._id);
            const quantity  = cartEntry?.quantity || 0;

            return (
              <div
                key={item._id}
                className="relative bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500"
                style={{ '--index': i }}
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain transition-all duration-700"
                  />
                </div>

                {/* Details */}
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl mb-2 font-dancingscript text-amber-100">
                    {item.name}
                  </h3>
                  <p className="text-amber-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed">
                    {item.description}
                  </p>

                  {/* Price & Cart Controls */}
                  <div className="mt-auto flex items-center gap-4 justify-between">
                    <div className="bg-amber-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg">
                      <span className="text-xl font-bold text-amber-300 font-dancingscript">
                        ₹{Number(item.price).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {quantity > 0 ? (
                        <>
                          <button
                            onClick={() =>
                              quantity > 1
                                ? updateQuantity(cartEntry?._id, quantity - 1)
                                : removeFromCart(cartEntry._id)
                            }
                            className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
                          >
                            <FaMinus className="text-amber-100" />
                          </button>
                          <span className="w-8 text-center text-amber-100">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                            className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors"
                          >
                            <FaPlus className="text-amber-100" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="bg-amber-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs sm:text-sm uppercase tracking-widest transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 overflow-hidden border border-amber-800/50"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurMenu;
