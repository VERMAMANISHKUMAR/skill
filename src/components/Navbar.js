import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Style Folder/Navbar.css';


const Navbar = () => {
  const cart = useSelector((state) => state.cart.items);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          E-Commerce
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addmyproduct">Products</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
        </ul>
         <div className='manish'>
         {/* <div className="navbar-actions">
          <Link to="/shopingcardpage" className="cart-link">
            Add to Card
          </Link>
        </div> */}
         <div className="navbar-actions">
          <Link to="/shopingcardpage" className="cart-link">
          Cart ({cartCount})
          </Link>
        </div>
        
        <div>
        <button className="signup-button">
            <Link to="/signin">SignUp</Link>
          </button>
          </div>
         </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
