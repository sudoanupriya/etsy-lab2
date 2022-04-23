import React, { useState } from 'react';
import { Stack } from "@fluentui/react"
import Button from '../atoms/button';
import Search from '../atoms/search';
import "./styles.css";
import { useNavigate } from 'react-router-dom';


const CONSTANTS = require('../../../config/constants.json');


const NavBar = () => {
    const navigate = useNavigate();

    const userID = JSON.parse(localStorage.getItem("user"))?._id;

    const [search, setsearch] = useState('');
    const handleSearchClick = () => {
        alert(search);
    }
    return (
        <div>
            <Stack horizontal styles={{ root: { paddingLeft: 100, paddingRight: 100 } }} tokens={{
                childrenGap: 15, padding: 10
            }}>
                <span >
                    <h2 onClick={()=>navigate(CONSTANTS.PAGE.HOME)} className="mainnavbar-title">Etsy</h2>
                </span>
                <span> <Search search={search} setSearch={setsearch} handleSearchClick={handleSearchClick} /> </span>
                <Stack horizontal styles={{ root: { paddingLeft: 30 } }} tokens={{ childrenGap: 15 }}>
                    <span> <Button buttonType={"USER"} redirectUrl={CONSTANTS.PAGE.USER.replace("{userID}", userID)} /></span>
                    <span> <Button buttonType={"FAV"} /></span>
                    <span> <Button buttonType={"CART"} /></span>
                    <span> <Button buttonType={"SHOP"} /></span>
                </Stack>
            </Stack>
        </div>
    );
}

export default NavBar;