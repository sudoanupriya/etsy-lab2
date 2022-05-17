import { Checkbox, TextField } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import "./styles.css";


const CartItem = ({ item, type, handleGiftPacking, removeItem }) => {
    console.log("IN ITEM: ", item);
    console.log("CART TYPE ", type);
    const [isGiftPacking, setGiftPacking] = useState();
    const [instructions, setInstructions] = useState();
    const [cartQuantity, setCartQuantity] = useState();

    useEffect(() => {
        if (handleGiftPacking) {
            handleGiftPacking(item._id, isGiftPacking, instructions, cartQuantity);
        }
    }, [isGiftPacking, instructions, cartQuantity]);
    return (
        <div class="product">
            <div class="product-image">
                <img src={item.displayPicture} />
            </div>
            <div class="cart-product-details">
                <div class="product-title">{item.name}</div>
                <p class="product-description">{item.description}</p>
            </div>
            {(type != "order") && <div class="product-giftpacking">
                <Checkbox label="Gift pack" onChange={(e) => { setGiftPacking(e.target.value) }} />
                <TextField label="Instruction" onChange={(e) => { setInstructions(e.target.value) }} multiline rows={3} />
            </div>}
            <div class="product-price">{item.price}</div>
            <div class="product-quantity">
                {(type != "order") && <input type="number" value={item.cartQuantity} min="1" onChange={(e) => { setCartQuantity(e.target.value) }} />}
                {(type == "order") && <p> {item.quantity} </p>} 
                {(type == "order") && <p> {item.shopName} </p>}
                {(type == "order") && (item.isGiftPack || item.instructions) && <p> {item.instructions} </p>}
            </div>
            <div class="product-removal">
                {(type != "order") && <button class="remove-product" onClick={() => { removeItem(item) }}>
                    Remove
                </button>}
                

            </div>
            {(type != "order") && <div class="product-line-price">{(item.cartQuantity||1) * item.price}</div>}
            {(type=="order")&& <p>{item.dop}</p>}
        </div>
    );
};

export default CartItem;