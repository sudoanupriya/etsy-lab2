import { Stack } from "@fluentui/react";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../config/config";
import Favourites from "../UI/molecules/favourites";
import UserProfile from "../UI/molecules/userProfile";

const CONSTANTS = require("../../config/constants.json")
const User = () => {
    const { userID } = useParams();
    const user = useSelector((state) => state.user);
    console.log(user);
    //const [user, setUser] = useState();
    const [favourites, setFavourites] = useState();
    const [favouriteDetails, setFavouriteDetails] = useState([]);
    // useEffect(() => {
    //     //get user details
    //     api.get(CONSTANTS.API.USER.GETUSER.replace("{userID}", userID))
    //         .then(res => {
    //             if (res && res.statusText == "OK" && res.data) {
    //                 const { user, favourites, items } = res.data;
    //                 //TODO: set user and items
    //                 setUser(user);
    //                 setFavourites(favourites);
    //                 console.log(res.data);
    //             }
    //         }, err => {
    //             console.log(err);
    //         });


    // }, [])

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(CONSTANTS.PAGE.LOGIN, { replace: true });
        }
    }, []);

    return (
        <div>
            <Stack tokens={{
                childrenGap: 375, padding: 10
            }}>
                <span ><UserProfile user={user} /></span>
                <span><Favourites favouriteDetails={favouriteDetails} /></span>
            </Stack>
        </div>
    );
}

export default User;