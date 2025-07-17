import { useCart } from "../../Context/CartContext";
import Header from "../Header";
import Footer from "../Footer";
import "./cartpage.css";

const CartPage = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  // const handleBuyNow = (item) => {
  //   alert(`Buying ${item.name} for ₹${item.price}`);
  //   // Add actual buying logic here
  // };
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      <div className="cart-page">
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>🛒 Your cart is empty.</p>
        ) : (
          <>
            <div className="product-grid">
              {cartItems.map((item, index) => (
                <div key={index} className="product-card">
                  {item.image && (
                    <img
                      src={
                        item.image
                          ? `http://localhost:8000${item.image}`
                          : "/placeholder.png"
                      }
                      alt={item.name}
                      className="product-image"
                    />
                  )}
                  <h3 className="product-name">{item.name}</h3>
                  <p className="description">{item.description}</p>
                  <p className="price">₹{item.price}</p>

                  <div className="product-actions">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="buy-btn"
                      onClick={() => handleBuyNow(item)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <h3>Total: ₹{total.toFixed(2)}</h3>
              <button className="checkout-btn">Checkout</button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
