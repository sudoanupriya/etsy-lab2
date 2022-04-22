import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../config/config";
import ItemCard from "../UI/molecules/item";
const CONSTANTS = require('../../config/constants.json');

const Home = () => {
    const [items, setItems] = useState();

    const getItems = () => {
        const userID = JSON.parse(localStorage.getItem("user"))._id;
        api.get(CONSTANTS.API.ITEM.GETALL.replace('{userID}', userID))
            .then(res => {
                if (res && res.data && res.status === 200) {
                    const { data } = res;
                    setItems(data);
                    //console.log(items);

                }
            }, err => { console.log(err) });
    }

    useEffect(getItems,[]);
    return (
        <div>HOME
            <div>
            {items && items.map((eachItem, index) => {
                console.log("IN HOME",eachItem);
                <ItemCard item={eachItem} index={index} />
            })}
            </div>
        </div>
    );
}

export default Home;