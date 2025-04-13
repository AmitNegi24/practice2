import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/ReducerSlice';
import "../Productcard/ProductCard.css";
import { toast } from 'react-toastify';

function ProductCard({ product }) {
  const id = product.productId;
  const title = product.title.slice(0, 36);  // Limiting title length to 36 characters
  const userInfo = useSelector((state) => state.bazaar.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (userInfo) {
      dispatch(
        addToCart({
          id: product.productId,
          title: product.title,
          image: product.productImage,
          price: product.price,
          quantity: 1,
          description: product.description,
        })
      );
      toast.success(`${product.title} is added`);  // Display toast message
    } else {
      toast.error("Please login first");  // Display error toast if not logged in
    }
  };

  const productDetail = () => {
    navigate(`/product/${id}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <div className="product-card">
      <div className='card' onClick={productDetail}>
        <img src={`data:image/jpeg;base64,${product.productImage}`} alt="Productimage" />
        <b><p>{title}</p></b>
        <p>${product.price}</p>
      </div>
      <button className='custom-element' onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
}

export default ProductCard;
