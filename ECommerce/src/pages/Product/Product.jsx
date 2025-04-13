import React, { useEffect, useState } from 'react';
import '../Product/Product.css';
import { useLocation } from 'react-router-dom';
import { MdOutlineStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/ReducerSlice';
import { toast } from "react-toastify";

function Product() {
  const location = useLocation();
  const [product, setProduct] = useState("");
  let [baseQty, setbaseQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setProduct(location.state.item);
  }, []);

  return (
    <div className='product-page'>
      <div className='product'>
        <div className='product-image'>
          <img
            className='productimage'
            src={`data:image/jpeg;base64,${product.productImage}`}
            alt='productimg'
          />
        </div>

        <div className='details'>
          <div>
            <h2>{product.title}</h2>
            <p className='price'>${product.price}</p>
          </div>

          <div className='rating'>
            <div className='stars'>
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>
            <p>(1 customer review)</p>
          </div>

          <p>{product.description}</p>

          <div className='quantity-cart-wrapper'>
            <div className='quantitybox'>
              <p>Quantity</p>
              <div className='buttons'>
                <button onClick={() => setbaseQty(baseQty === 1 ? 1 : baseQty - 1)}>-</button>
                <span>{baseQty}</span>
                <button onClick={() => setbaseQty(baseQty + 1)}>+</button>
              </div>
            </div>

            <button
              className='addtocartbutton'
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.productId,
                    title: product.title,
                    image: product.productImage,
                    price: product.price,
                    quantity: baseQty,
                    description: product.description,
                  })
                ) & toast.success(`${product.title} is added`)
              }
            >
              Add to cart
            </button>
          </div>

          <p>Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
