import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../config/config";
import Filter from "../UI/molecules/filter";
import DisplayItems from "../UI/molecules/displayItems";
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

    useEffect(getItems, []);
    return (
        <div>
            <div className="filter">
                <Filter />
            </div>

            <DisplayItems items={items} />
        </div>
    );
}

export default Home;