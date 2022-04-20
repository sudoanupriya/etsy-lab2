import React, { useState } from 'react';
import { Stack } from "@fluentui/react"
import Button from '../atoms/button';
import Search from '../atoms/search';
import "./styles.css";

const NavBar = () => {
    const [search, setsearch] = useState('');
    const handleSearchClick = ()=> {
        alert(search);
    }
    return (
        <div>
            <Stack horizontal styles={{ root: { paddingLeft: 100, paddingRight: 100 } }} tokens={{
                childrenGap: 15, padding: 10
            }}>
                <span><h3 className="mainnavbar-title" href="/home">Etsy</h3></span>
                <span> <Search search={search} setSearch={setsearch} searchItems={handleSearchClick} /> </span>
                <Stack horizontal styles={{ root: { paddingLeft: 30 } }} tokens={{childrenGap: 15}}>
                    <span> <Button buttonType={"USER"} /></span>
                    <span> <Button buttonType={"FAV"} /></span>
                    <span> <Button buttonType={"CART"} /></span>
                </Stack>
            </Stack>
        </div>
    );
}

export default NavBar;