import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../UI/molecules/NavBar";

const ShopHome = ()=>{

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate(CONSTANTS.PAGE.LOGIN, { replace: true });
        }
    }, []);

    return(
        <div>
            <NavBar />
            SHOP HOME
        </div>
    )
}

export default ShopHome;