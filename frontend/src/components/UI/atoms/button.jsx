import * as React from 'react';
import {useNavigate} from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser, AiFillEdit, AiOutlineHeart, AiOutlineShop } from "react-icons/ai";

const Button = ({ buttonType, redirectUrl }) => {
    const navigate = useNavigate();
    function onIconClick() {
       navigate(redirectUrl);
    }
    return (
        <div>
            {(buttonType == "CART") && <AiOutlineShoppingCart fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "EDIT") && <AiFillEdit fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "USER") && <AiOutlineUser fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "FAV") && <AiOutlineHeart fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
            {(buttonType == "SHOP") && <AiOutlineShop fontSize={40} onClick={onIconClick} style={{ cursor: "pointer" }} />}
        </div>
    )
}

export default Button;