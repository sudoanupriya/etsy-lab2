import { concatStyleSetsWithProps } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/config";
import CartItem from "../UI/atoms/cartItem";
import NavBar from "../UI/molecules/NavBar";
import "./cart.scss";

const CONSTANTS = require('../../config/constants.json');
const Cart = () => {

    const [cart, setCart] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const userID = JSON.parse(localStorage.getItem("user"))._id;

    const getCartItems = () => {
        api.get(CONSTANTS.API.USER.GETCART.replace("{userID}", userID)).then(res => {

            if (res && res.data) {
                setCart([...res.data.cart]);
                console.log("CART ITEMS", cart);
                //console.log(res.data.cart);
                setRefresh(!refresh);
            }
        }, err => {
            console.log(err);
        })
    }

    const calculatePrice = () => {
        let price = 0;
        if (cart) {
            cart.forEach(item => {
                price = price + (item.price * (item.cartQuantity || 1));
            });
            setTotalPrice(price);
        }
    }

    const handleGiftPacking = (itemID, isGiftPacking, instructions, cartQuantity) => {
        //add fields to cart items.
        cart.forEach(item => {
            if (item._id === itemID) {
                item.isGiftPacking = isGiftPacking;
                item.instructions = (isGiftPacking) ? instructions : "";
                item.cartQuantity = cartQuantity
            }
            console.log("AFTER GIFT PACKING", item);
        });
        setCart([...cart]);
    }

    const removeItem = (item) => {
        const updatedCart = cart.filter(el => el._id !== item._id);
        console.log("AFTER REMOVING", updatedCart);
        setCart([...updatedCart]);
    }


    const checkout = () => {
        if (cart) {
            console.log("CHECKOUT");
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;

            let order = {}
            order.userID = userID;
            order.totalPrice = totalPrice;
            order.items = [];
            cart.forEach(item => {
                let orderItem = {
                    itemID: item._id,
                    quantity: item.cartQuantity || 1,
                    isGiftPack: (item.isGiftPack == true) ? true : false,
                    instructions: item.instructions,
                    displayPicture: item.displayPicture,
                    name: item.name,
                    shopName: item.shopName,
                    price: item.price,
                    dop: today
                }
                order.items.push(orderItem);
            })
            console.log(order);

            api.post(CONSTANTS.API.ORDER.ADDORDER, order).then(res => {
                if (res && res.data) {
                    setCart([]);
                }
            }, err => {
                console.log(err);
            })

        }

    }
    useEffect(getCartItems, []);
    useEffect(calculatePrice, [cart]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(CONSTANTS.PAGE.LOGIN, { replace: true });
        }
    }, []);

    return (
        <div>
            <NavBar />
            <h1>Shopping Cart</h1>

            <div class="shopping-cart">

                <div class="column-labels">
                    <label class="product-image">Image</label>
                    <label class="cart-product-details">Product</label>
                    <label class="product-giftpacking">Gift Packing</label>
                    <label class="product-price">Price</label>
                    <label class="product-quantity">Quantity</label>
                    <label class="product-removal">Remove</label>
                    <label class="product-line-price">Total</label>
                </div>
                {
                    cart && cart.map((item, index) => (
                        <CartItem item={item} handleGiftPacking={handleGiftPacking} index={index} removeItem={removeItem} />
                    ))
                }

                <div class="totals">
                    <div class="totals-item totals-item-total">
                        <label>Grand Total</label>
                        <div class="totals-value" id="cart-total">{totalPrice}</div>
                    </div>
                </div>

                <button class="checkout" onClick={() => { checkout() }}>Checkout</button>

            </div>
        </div>
    );
}

export default Cart;