import React from "react";
import ItemCard from "../atoms/itemCard";

const displayItems = (props)=>{
    const {items, removeFavourite, favourite, currency} = props;

    return(
        <div>
            <div className="main-container">
                <div className="grid-wrapper">
                    {items && items.map((eachItem, index) => (
                            <ItemCard currency={currency} item={eachItem} index={index} favourite={favourite} removeFavourite={removeFavourite} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default displayItems;