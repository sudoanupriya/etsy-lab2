import React from "react";
import ItemCard from "../atoms/item";

const displayItems = (props)=>{
    const {items} = props;

    return(
        <div>
            <div className="main-container">
                <div className="grid-wrapper">
                    {items && items.map((eachItem, index) => (
                            <ItemCard item={eachItem} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default displayItems;