import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/slices/productsSlice';
import { toast } from 'react-toastify';
import '../Style Folder/AddProduct.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // New state for image
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a local URL to preview image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled out
    if (!name || !price || !description || !image) {
      toast.error('Please fill out all fields including image.');
      return;
    }

    // Create a product object
    const newProduct = {
      name,
      price: parseFloat(price),
      description,
      image,
    };

    // Dispatch action to add product to the Redux store
    dispatch(addProduct(newProduct));

    // Show success toast notification
    toast.success('Product added successfully!');

    // Clear the form fields
    setName('');
    setPrice('');
    setDescription('');
    setImage(null); // Reset image state
  };

  return (
    <div className="mainCantenar">
      <h2 className='Header'>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
         <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {image && (
            <div className="image-preview mt-3">
              <img src={image} alt="Product Preview" className="img-fluid" />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Product
        </button>
      </form>
      </div>
    
  );
};

export default AddProduct;
