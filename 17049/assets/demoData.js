// Demo/mock users and sellers for final year project demo
export const demoUsers = [
  {
    id: "u1",
    name: "Demo User",
    email: "user@demo.com",
    password: "User@1234",
    role: "buyer",
    orders: [],
    cartItems: {},
  },
];

export const demoSellers = [
  {
    id: "s1",
    name: "Demo Seller",
    email: "seller@demo.com",
    password: "Seller@1234",
    role: "seller",
    products: [1, 2, 3], // product ids from productData.js
  },
];

// You can import these in your context or API mocks for demo purposes.
