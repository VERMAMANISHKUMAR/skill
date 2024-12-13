import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, updateProduct, deleteProduct } from '../redux/slices/productsSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Style Folder/AddMyProduct.css'; 

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.description) {
      toast.error('All fields are required!');
      return;
    }

    const updatedProduct = { ...editingProduct, ...formData };
    dispatch(updateProduct(updatedProduct));
    toast.success('Updated successfully!');
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleEditImage = (product) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(updateProduct({ ...product, image: reader.result }));
          toast.success('Image updated !');
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success('Deleted successfully!');
  };

  return (
    <div className="product-container">
      <ToastContainer />
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {editingProduct && editingProduct.id === product.id ? (
              <div className="edit-form">
                <h5>Edit Product</h5>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </label>
                <div className='button'>
                <div>
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                </div>
                <div>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
                </div>
                </div>
              </div>
            ) : (
              <>
              <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <p>No Image Available</p>
                  )}
                  
                </div>
                <div className="product-info">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-price">Price: ${product.price}</p>
                  <p className="product-description">{product.description}</p>
                  <div></div>
                  <button
                    className="edit-image-button"
                    onClick={() => handleEditImage(product)}
                  >
                    Edit Image
                  </button>
                  <div className="product-actions">
                  
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
