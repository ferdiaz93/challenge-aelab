import React, { useState } from "react";
import { redeemProduct } from '../api'
import coinIcon from '../assets/icons/coin.svg'
import buyBlueIcon from '../assets/icons/buy-blue.svg'
import buyWhiteIcon from '../assets/icons/buy-white.svg'


const Product = ({ Item, UserPoints, openModal, updateHistoryProducts }) => {
  const [product, setProduct] = useState(Item);
  const [buyIcon, setBuyIcon] = useState(buyBlueIcon)

  const selectProduct = (productId) => {
    redeemProduct(productId)
      .then(function (response) {
        openModal(response.data.message);
        updateHistoryProducts();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <div
      className="product-button"
      onMouseEnter={() => { setBuyIcon(null) }}
      onMouseLeave={() => { setBuyIcon(buyBlueIcon) }}
    >
      <div className="initial-product-view">
        {UserPoints < product.cost ?
          <button className="grey-button float-need-button">
            You need {product.cost - UserPoints}
            <img src={coinIcon}alt="" />
          </button>
          :
          <img
            className={`float-buy-button ${buyIcon ? 'show' : 'hide'}`}
            src={buyIcon}
            alt="buy-icon"
          />
        }
        <div className="product-image">
          <img src={product?.img?.url} alt=""></img>
        </div>
        <div className="product-description">
          <p className="section">{product.category}</p>
          <span className="name">{product.name}</span>
        </div>
      </div>
      {UserPoints > product.cost ?
        <div className="action-product">
          <span>{product.cost} <img src={coinIcon}alt="" /></span>
          <button className="default-button" onClick={() => { selectProduct(product._id) }}>Redeem now</button>
          <img
            className="float-buy-button-hover"
            src={buyWhiteIcon}
            alt="buy-icon"
          />
        </div>
        : null}
    </div>
  )

}

export default Product;