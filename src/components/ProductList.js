import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import '../Style Folder/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  // const [editProductTitle, setEditProducTtitle]=useState("")
  // const[editProductPrice, setEditProductPrice]=useState(null)
  // const[editProductDiscription, setEditProductDiscription]=useState("")
  // const[editProductId, setEditProductId]=useState(null)

  const dispatch = useDispatch(); 

  useEffect(() => {
    const fetchProductsFromApi = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error('Failed to load products!');
      }
    };

    fetchProductsFromApi();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success('Product added to cart!');
  };

  const sortedProducts = sortByPrice
    ? [...products].sort((a, b) => a.price - b.price)
    : products;

  return (
    <div className="product-container">
      <ToastContainer />
      <button
        className="sortByPrice"
        onClick={() => setSortByPrice(!sortByPrice)}
      >
        {sortByPrice ? 'Sort by Price (Low to High)' : 'Sort by Price (High to Low)'}
      </button>
      <div className="product-list">
        {sortedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              {product.image ? (
                <img src={product.image} alt={product.title} />
              ) : (
                <p>No Image Available</p>
              )}
            </div>
            <div className="product-info">
              <h5 className="product-name">{product.title}</h5>
              <p className="product-price">Price: ${product.price}</p>
              <p className="product-description">{product.description}</p>
              <div className="product-actions">
                <button
                  className="AddtoCardButton"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <Link
                  to="/shopingcardpage"
                  className="GoToCardPage"
                >
                  Go to Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
