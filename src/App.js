import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import AddMyProduct from './components/AddMyProduct';

import CartPage from './components/CartPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Shopingcardpage from './components/Shopingcardpage';
// import Productcardpage from "./components/ProductCardPage"
import CheckoutPage from './components/CheckoutPage';
// import authSlice from "./redux/authSlice"
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/addmyproduct" element={<AddMyProduct />} />
        
        <Route path="/shopingcardpage" element={<Shopingcardpage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/productcardpage" element={<Productcardpage />} /> */}
        <Route path="/checkoutpage" element={<CheckoutPage />} />
        {/* <Route path="/authslice" element={<authSlice/>} /> */}
        
      </Routes>
    </Router>
  );
};

export default App;
