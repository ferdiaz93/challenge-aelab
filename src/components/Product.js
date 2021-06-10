import React, { useState } from "react";
import { redeemProduct } from '../api'
import coinIcon from '../assets/icons/coin.svg'
import buyBlueIcon from '../assets/icons/buy-blue.svg'
import buyWhiteIcon from '../assets/icons/buy-white.svg'


const Product = ({ Product, UserPoints, openModal, ActiveFilter, updateHistoryProducts }) => {
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
        {UserPoints < Product.cost ?
          <button className="grey-button float-need-button">
            You need {Product.cost - UserPoints}
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
          <img src={Product.img?.url} alt=""></img>
        </div>
        <div className="product-description">
          <p className="section">{Product.category}</p>
          <span className="name">{Product.name}</span>
        </div>
      </div>
      {UserPoints > Product.cost ?
        <div className="action-product">
          <span>{Product.cost} <img src={coinIcon} alt="" /></span>
          <button className="default-button" onClick={() => { selectProduct( ActiveFilter === 'Most recent' ? Product.productId : Product._id) }}>Redeem now</button>
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