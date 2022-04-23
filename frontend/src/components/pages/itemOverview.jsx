import React from "react";
import { useParams } from "react-router-dom"; 


const ItemOverview = ()=>{
    const { itemID } = useParams();
    return(
        <div>
            ITEM OVERVIEW {itemID}
        </div>
    );
}

export default ItemOverview;