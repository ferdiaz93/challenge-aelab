import React, { useState, useEffect } from "react";
import { redeemProduct } from '../api'


const Product = ({ Item, UserPoints, openModal }) => {
  const icon = {
    white: './assets/icons/buy-white.svg',
    blue: './assets/icons/buy-blue.svg',
  }
  const [product, setProduct] = useState(Item);
  const [buyIcon, setBuyIcon] = useState(icon.blue)

  const selectProduct = (productId) => {
    redeemProduct(productId)
      .then(function (response) {
        openModal(response.data.message)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <div
      className="product-button"
      onMouseEnter={() => { setBuyIcon(null) }}
      onMouseLeave={() => { setBuyIcon(icon.blue) }}
    >
      <div className="initial-product-view">
        {UserPoints < product.cost ?
          <button className="grey-button float-need-button">
            You need {product.cost - UserPoints}
            <img src="./assets/icons/coin.svg" alt="" />
          </button>
          :
          <img
            className={`float-buy-button ${buyIcon ? 'show' : 'hide'}`}
            src={buyIcon}
            alt="buy-icon"
          />
        }
        <div className="product-image">
          <img src={product.img.url}></img>
        </div>
        <div className="product-description">
          <p className="section">{product.category}</p>
          <span className="name">{product.name}</span>
        </div>
      </div>
      {UserPoints > product.cost ?
        <div className="action-product">
          <span>{product.cost} <img src="./assets/icons/coin.svg" alt="" /></span>
          <button className="default-button" onClick={() => { selectProduct(product._id) }}>Redeem now</button>
          <img
            className="float-buy-button-hover"
            src={icon.white}
            alt="buy-icon"
          />
        </div>
        : null}
    </div>
  )

}

export default Product;