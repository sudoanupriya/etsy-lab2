import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../config/config";
import Filter from "../UI/molecules/filter";
import NavBar from "../UI/molecules/NavBar";
import DisplayItems from "../UI/molecules/displayItems";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
const CONSTANTS = require('../../config/constants.json');

const Home = () => {
    const dispatch = useDispatch();
    const initItems = useSelector((state) => state.items);
    const [items, setItems] = useState();
    const [search, setSearch] = useState();
    const [refresh, setRefresh] = useState(false);

    const handleSearch = () => {
        console.log("INIT ITEMS:", initItems);
        if (search !== "") {
            let filteredItems = initItems.filter(item => {
                return item.name.includes(search);
            });
            console.log("FILTERED ITEMS:", filteredItems);
            setItems(filteredItems);
        }
        else {
            setItems(initItems);
        }
    }

    const favourite = (userID, itemID) => {
        api.put(CONSTANTS.API.USER.ADDFAV.replace("{userID}", userID), { itemID }).then(res => {
            //console.log("ADD",res);
            if (res && res.data) {
                items.forEach(item => {
                    if(item._id === itemID)
                          item.favourited=true;
                 });
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
                items.forEach(item => {
                   if(item._id === itemID)
                         item.favourited=false;
                });
                //setItems(items);
                setRefresh(!refresh);
            }
        }, err => {
            console.log(err);
        })
    }

    const getItems = () => {
        const userID = JSON.parse(localStorage.getItem("user"))._id;
        api.get(CONSTANTS.API.ITEM.GETALL.replace('{userID}', userID))
            .then(res => {
                if (res && res.data && res.status === 200) {
                    const { data } = res;
                    setItems(data);
                    dispatch(addItems(data));
                    //console.log(items);

                }
            }, err => { console.log(err) });
    }

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(CONSTANTS.PAGE.LOGIN, { replace: true });
        }else{
        getItems();
        }
    }, []);

    
    return (
        <div>
            <NavBar search={search} setSearch={setSearch} handleSearch={handleSearch} />
            <div className="filter">
                <Filter />
            </div>

            <DisplayItems items={items} favourite={favourite} removeFavourite={removeFavourite}/>
        </div>
    );
}

export default Home;