import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUser, AiFillEdit, AiOutlineHeart, AiOutlineShop } from "react-icons/ai";

const Button = ({ buttonType, redirectUrl }) => {
    const navigate = useNavigate();
    function onIconClick() {
        if (buttonType == "LOGOUT") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        navigate(redirectUrl, { replace: true });
    }
    return (
        <div>
            {(buttonType == "CART") && <AiOutlineShoppingCart fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "EDIT") && <AiFillEdit fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "USER") && <AiOutlineUser fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "FAV") && <AiOutlineHeart fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "SHOP") && <AiOutlineShop fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "ORDERS") && <AiOutlineShopping fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "LOGOUT") && <AiOutlineLogout fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
        </div>
    )
}

export default Button;