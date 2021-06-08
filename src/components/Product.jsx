import React, { useState, useEffect } from "react";

const Product = ({Item, UserPoints}) =>{
    const icon = {
        white: './assets/icons/buy-white.svg',
        blue: './assets/icons/buy-blue.svg',
    }
    const [product, setProduct] = useState(Item);
    const [buyIcon, setBuyIcon] = useState(icon.blue)

    return (
        <div
        className="product-button"
        onMouseEnter={() => {setBuyIcon(null)}}
        onMouseLeave={() => {setBuyIcon(icon.blue)}}
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
                    <span>12.000 <img src="./assets/icons/coin.svg" alt="" /></span>
                    <button className="default-button">Redeem now</button>
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