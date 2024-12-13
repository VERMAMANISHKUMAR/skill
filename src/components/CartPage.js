import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Style Folder/CardPage.css';

const CartPage = () => {
  const [products, setProducts] = useState([]); // To store products from the API
  const cartItems = useSelector((state) => state.cart.items); 
  const cartCount = cartItems.length;
  const dispatch = useDispatch();

  // Fetch product data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data); // Set products in state
      } catch (error) {
        toast.error('Failed to fetch product data.');
      }
    };
    fetchProducts();
  }, []);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success('Item removed from cart.');
  };

  // Map cart items to include product details
  const cartProductDetails = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return {
      ...cartItem,
      name: product?.title || 'Unknown Product',
      price: product?.price || 0,
      image: product?.image || '',
    };
  });

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      <p>Total Items: {cartCount}</p>
      {cartCount === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartProductDetails.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card mb-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
