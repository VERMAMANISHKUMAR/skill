import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import '../Style Folder/Shopingcardpage.css';

const ShoppingCartPage = () => {
  // Access cart items and count from Redux store
  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0); // Sum up all quantities
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.info('Product removed from cart.');
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      toast.error('Quantity must be at least 1');
      return;
    }
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="shopping-cart-page">
      <h2>Your Shopping Cart</h2>
      <p>Total Items in Cart: {cartCount}</p> {/* Display total cart count */}
      {cart.length > 0 ? (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h5>{item.title}</h5>
                  <p>
                    <strong>Description:</strong> {item.description || 'No description available.'}
                  </p>
                  <p>Price: ${item.price}</p>
                  <div className="quantity-controls">
                    <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h4>Total: ${calculateTotal()}</h4>
            <Link to="/checkoutpage">
              <button className="btn btn-success">Proceed to Checkout</button>
            </Link>
            <Link to="/" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </>
      ) : (
        <p>
          Your cart is empty. <Link to="/">Now go to Home page.</Link>
        </p>
      )}
    </div>
  );
};

export default ShoppingCartPage;
