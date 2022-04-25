import { Checkbox, Stack, TextField } from "@fluentui/react";
import React from "react";


const Filter = () => {
    return (
        <div>
            <Stack horizontal styles={{ root: { backgroundColor: "#D4E9D7", height: 100 } }} tokens={{
                childrenGap: 15, padding: 10
            }}>
                <span>Sort By:</span>
                <div>
                    <Checkbox label="Price" />
                    <Checkbox label="Quantity" />
                    <Checkbox label="Sales Count" />
                </div>
                &ensp;&ensp;&ensp;
                <span>FILTER</span>
                <div>
                    <TextField placeholder="Min Price" />
                    <TextField placeholder="Max Price" />
                </div>
                &ensp;&ensp;&ensp;
                <span><Checkbox label="Exclude 'Out of Stock'" /></span>

            </Stack>

        </div>
    );
}

export default Filter;