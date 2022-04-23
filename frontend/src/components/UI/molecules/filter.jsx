import { Stack } from "@fluentui/react";
import React from "react";


const Filter = ()=>{
    return(
        <div>
            <Stack horizontal styles={{ root: { backgroundColor: "#D4E9D7", height: 100} }} tokens={{
                childrenGap: 15, padding: 10
            }}>
                <span>FILTER</span>

            </Stack>
            
        </div>
    );
}

export default Filter;