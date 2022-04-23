import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles.css";


const CONSTANTS = require('../../../config/constants.json');

const ItemCard = (props) => {
    const { item, currency } = props
    const navigate = useNavigate();
    console.log("INSIDE ITEMCARD", item);
    //const IMAGE_URL = CONSTANTS.baseUrl + CONSTANTS.port + CONSTANTS.API.ITEM.GETDP.replace("{key}", item.displayPicture);
    const IMAGE_URL = "";

    return (
        <div>
            <div class="product-card">
                {(item.quantity==0) && <div class="badge">Out of Stock</div>}
                <div class="product-tumb">
                    <img src={IMAGE_URL} />
                </div>
                <div class="product-details">
                    <h4><a onClick={()=>{navigate(CONSTANTS.PAGE.ITEM.replace('{itemID}', item._id))}}>{item.name}</a></h4>
                    <p>{item.description}</p>
                    <div class="product-bottom-details">
                        <div class="product-price">{currency}{item.price}</div>
                        <div class="product-links">
                            <a onClick={()=>{}}><i class="fa fa-heart"></i></a>
                            <a onClick={()=>{}}><i class="fa fa-shopping-cart"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemCard;