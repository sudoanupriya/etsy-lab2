import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDollar, AiOutlineHeart, AiFillHeart, AiOutlinePlus, AiOutlineMinus, AiOutlineShoppingCart } from "react-icons/ai";
import "./styles.css";
import api from '../../../config/config';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Quantity from './quantity';
import { Dropdown, PrimaryButton } from '@fluentui/react';


const CONSTANTS = require('../../../config/constants.json');

//TODO: get quantity and add to cart
const ItemCard = ({ addToCart, item, type, currency, favourite, removeFavourite, quantity, setQuantity }) => {
    const navigate = useNavigate();
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    let itemID = item._id;
    console.log("INSIDE ITEMCARD", item);
    //const IMAGE_URL = "https://s3-us-west-1.amazonaws.com/etsy-clone-mern-stack/"+ item?.displayPicture;
    const IMAGE_URL = item.displayPicture;    


    return (
        <div>
            <div className={(type == "overview") ? "product-overview" : "product-card"}>
                {(item?.quantity == 0) && <div className="badge">Out of Stock</div>}
                <div className="product-tumb">
                    <img src={IMAGE_URL} ></img>
                </div>
                <div className="product-details">
                    <h4><a onClick={() => { navigate(CONSTANTS.PAGE.ITEM.replace('{itemID}', item?._id)) }}>{item?.name}</a></h4>
                    <p>{item?.description}</p>
                    <div className={(type == "overview") ? ".product-overview-bottom-details" : "product-bottom-details"}>
                        <div className="product-price">
                            {currency == "USD" && <AiOutlineDollar />}{currency}{item?.price}</div>
                        <div>
                            {(type == "overview") && <Quantity quantity={quantity} />}                            
                        </div>
                        <div className="product-links">
                            {!item.favourited && <AiOutlineHeart onClick={() => favourite(userID, itemID)} fontSize={30} style={{ color: 'red', hover: "orange" }} />}
                            {item.favourited && <AiFillHeart onClick={() => removeFavourite(userID, itemID)} fontSize={30} style={{ color: 'red', hover: "orange" }} />}
                            <a onClick={() => { }}><i className="fa fa-shopping-cart"></i></a>
                        </div>
                        <div>
                            {(type=="overview")&& <PrimaryButton text="Add to cart" onClick={()=>addToCart(userID, itemID)} style={{background: "black"}}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;

/**
 * <Dropdown
                                label='Quantity'
                                placeholder="Required with no label"
                                ariaLabel="Required dropdown example"
                                options={[
                                    { key: '1', text: '1' },
                                    { key: '2', text: '2' },
                                    { key: '3', text: '3' },
                                    { key: '4', text: '4' },
                                    { key: '5', text: '5' },
                                    { key: '6', text: '6' },
                                    { key: '7', text: '7' },
                                    { key: '8', text: '8' },
                                    { key: '9', text: '9' },
                                    { key: '10', text: '10' },
                                ]}
                                styles={{ width: 20 }}
                                />
 */