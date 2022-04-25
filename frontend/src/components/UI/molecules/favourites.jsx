import { Stack } from "@fluentui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../../config/config";
import Search from "../atoms/search";
import DisplayItems from "./displayItems";

const CONSTANTS = require("../../../config/constants.json")

const Favourites = (props) => {
    const { userID, favouriteDetails } = props;

    const [fav, setFavs] = useState([]);
    const [search, setsearch] = useState('');

    const handleSearch = () => {
        alert(search);
    }

    return (
        <div>
            <Stack horizontal tokens={{childrenGap:15}}>
                <h4 className="mainnavbar-title">Favourite Items</h4>
                <Search search={search} setSearch={setsearch} handleSearch={handleSearch} />
                <p> {search} </p>
            </Stack>
            <DisplayItems items={favouriteDetails} />
        </div>
    );
}

export default Favourites;