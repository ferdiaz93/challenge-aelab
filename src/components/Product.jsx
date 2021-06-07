import React, { useState, useEffect } from "react";

const Product = ({Item}) =>{
    const [product, setProduct] = useState(Item);

    return (
        <div
        className="product-button"
        onMouseEnter={() => {
            console.log("Event:MouseEnter");
        }}
        >
            <div className="initial-product-view">
                <button className="grey-button float-need-button">
                    You need 400
                    <img src="./assets/icons/coin.svg" alt="" />
                </button>
                <div className="product-image">
                    <img src={product.img.url}></img>
                </div>
                <div className="product-description">
                    <p className="section">{product.category}</p>
                    <span className="name">{product.name}</span>
                </div>
                <img className="float-buy-button" src="./assets/icons/buy-white.svg" alt="" />
            </div>
            <div className="action-product">
                <span>12.000</span>
                <button className="default-button">Redeem now</button>
            </div>
        </div>
    )

}

export default Product;