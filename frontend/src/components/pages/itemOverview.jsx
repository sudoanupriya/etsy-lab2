import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "../UI/atoms/itemCard";
import api from "../../config/config";
import { useState } from "react";
import NavBar from "../UI/molecules/NavBar";

const CONSTANTS = require('../../config/constants.json');


const ItemOverview = () => {
    const { itemID } = useParams();
    const [item, setItem] = useState({});
    const [refresh, setRefresh] = useState(false);


    const favourite = (userID, itemID) => {
        api.put(CONSTANTS.API.USER.ADDFAV.replace("{userID}", userID), { itemID }).then(res => {
            //console.log("ADD",res);
            if (res && res.data) {
                item.favourited = true;
                //setItems(items);
                setRefresh(!refresh);
            }
        }, err => {
            console.log(err);
        })
    }

    const removeFavourite = (userID, itemID) => {
        api.put(CONSTANTS.API.USER.REMOVEFAV.replace("{userID}", userID), { itemID }).then(res => {
            //console.log("REMOVE",res);
            if (res && res.data) {
                item.favourited = false;
                //setItems(items);
                setRefresh(!refresh);
            }
        }, err => {
            console.log(err);
        })
    }

    const getItem = () => {
        api.get(CONSTANTS.API.ITEM.GETITEM.replace('{itemID}', itemID))
            .then(res => {
                if (res && res.data && res.status === 200) {
                    const { data } = res;
                    setItem(data[0]);
                    console.log(data[0]);
                    console.log(item);
                    setRefresh(!refresh);

                }
            }, err => { console.log(err) });
    }

    const addToCart = (userID, itemID) => {
        console.log("ADDing", itemID, "to cart");
        api.post(CONSTANTS.API.USER.ADDCARTITEM.replace("{userID}", userID), { itemID }).then(res => {
            console.log("Add cart", res);
        }, err => { console.log(err) });
    }

    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(CONSTANTS.PAGE.LOGIN, { replace: true });
        }
        getItem();
    }, []);

    return (
        <div>
            <NavBar />
            <ItemCard addToCart={addToCart} item={item} type={"overview"} favourite={favourite} removeFavourite={removeFavourite} />
        </div>
    );
}

export default ItemOverview;