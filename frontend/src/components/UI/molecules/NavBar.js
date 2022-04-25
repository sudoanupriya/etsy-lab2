import React, { useState } from 'react';
import { Stack } from "@fluentui/react"
import Button from '../atoms/button';
import Search from '../atoms/search';
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CONSTANTS = require('../../../config/constants.json');


const NavBar = ({search, setSearch, handleSearch}) => {
    const navigate = useNavigate();

    const userID = useSelector((state) => state.user._id);
    return (
        <div>
            <Stack horizontal styles={{ root: { paddingLeft: 100, paddingRight: 100, marginBottom: 25 } }} tokens={{
                childrenGap: 15, padding: 10
            }}>
                <span >
                    <h2 onClick={()=>navigate(CONSTANTS.PAGE.HOME)} className="mainnavbar-title">Etsy</h2>
                </span>
                <span> <Search search={search} setSearch={setSearch} handleSearch={handleSearch} /> </span>
                <Stack horizontal styles={{ root: { paddingLeft: 30 } }} tokens={{ childrenGap: 15 }}>
                    <span> <Button buttonType={"USER"} redirectUrl={CONSTANTS.PAGE.USER.replace("{userID}", userID)} /></span>
                    <span> <Button buttonType={"FAV"} /></span>
                    <span> <Button buttonType={"CART"} redirectUrl={CONSTANTS.PAGE.CART}/></span>
                    <span> <Button buttonType={"SHOP"} /></span>
                    <span> <Button buttonType={"ORDERS"} redirectUrl={CONSTANTS.PAGE.ORDERS} /></span>
                    <span> <Button buttonType={"LOGOUT"} redirectUrl={CONSTANTS.PAGE.LOGIN}  /></span>
                </Stack>
            </Stack>
        </div>
    );
}

export default NavBar;