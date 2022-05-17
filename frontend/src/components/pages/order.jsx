import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import api from '../../config/config';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CartItem from '../UI/atoms/cartItem';
import NavBar from '../UI/molecules/NavBar';
import ReactPaginate from 'react-paginate';


const CONSTANTS = require('../../config/constants.json');

function Orders(props) {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(2);
    const [startIndex, setstartIndex] = useState(0);
    const [endIndex, setendIndex] = useState(2);
    const userID = JSON.parse(localStorage.getItem("user"))._id;
    const currency = JSON.parse(localStorage.getItem("user")).currency;

    const handleChange = (event, value) => {
        setstartIndex((value - 1) * ordersPerPage);
        setendIndex(Math.min(value * ordersPerPage, orders.length));
        setPage(value);
        console.log(startIndex, endIndex);
    };

    const getOrders = () => {
        let getOrderURL = CONSTANTS.API.ORDER.GETORDERS.replace("{userID}", userID);
        getOrderURL = getOrderURL.replace("{page}", page);
        getOrderURL = getOrderURL.replace("{pageSize}", ordersPerPage);
        console.log("GET ORDER URL", getOrderURL);

        api.get(getOrderURL)
            .then(res => {
                console.log("FROM API", res);
                if (res && res.data) {
                    setOrders([...res.data]);
                    console.log("In state", orders);
                    console.log("length", orders.length);

                }
            }, err => {
                console.log(err);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(CONSTANTS.PAGE.LOGIN, { replace: true });
        }
        getOrders();
    }, [page, ordersPerPage]);

    const handleordersPerPageChange = (event) => {
        const ordersPerPageVal = parseInt(event.target.value, 10);
        setOrdersPerPage(ordersPerPageVal);
        setPage(1);
    };

    const handlePageChange = (event) => {
        setPage(parseInt(event.target.value, 10));
    };
    return (
        <div>
            <NavBar />
            <div className="orders_container">
                <div className="orders_header">Orders</div>
                {
                    orders.length > 0 && (
                        <div className="orderPerPageContainer">
                            <label htmlFor="ordersPerPage">Orders Per Page:</label>
                            <select className="ordersPerPage" onChange={handleordersPerPageChange}>
                                <option>2</option>
                                <option>5</option>
                                <option>10</option>
                            </select>
                            &emsp;
                            <label htmlFor="ordersPerPage">Page No:</label>
                            <select className="ordersPerPage" onChange={handlePageChange}>
                                <option selected="selected">1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    )
                }
                {orders && orders.length > 0 && 
                    orders.map((order) => (
                        <div className="order_container">
                            <div className="order_header_container">
                                <div className="order_orderid orderdet">
                                    Order No:
                                    {order._id}
                                </div>
                                <div className="order_totalprice orderdet .product-price">
                                    Total Price:
                                    {order.totalPrice}
                                </div>
                            </div>
                            <div className="order_items">
                                {order.items.map(
                                    (item, index) => (
                                        <CartItem
                                            item={item} index={index} type={"order"}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    ))
                }


                {
                    orders.length <= 0 && <div className="no-orders">Oops! No Orders yet.</div>
                }

            </div>

        </div>

    );
}

export default Orders;

// { orders && (orders.length > 1) &&
//     <Pagination
//         count={parseInt(Math.ceil(orders.length / ordersPerPage), 10)}
//         page={page}
//         onChange={handleChange}
//     />
// }