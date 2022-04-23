import * as React from 'react';
import './styles.css'
import { SearchBox } from '@fluentui/react/lib/SearchBox';
const Search = ({ search, setSearch, handleSearchClick }) => {
    // const onChange = e => setSearchVal(e.target.value);
    // const onSubmit = evt => {
    //     evt.preventDefault();
    //     if (searchVal === "") {
    //         alert("Please enter something!");
    //     } else {
    //         alert(searchVal);
    //         setSearchVal("");
    //     }
    // };

    return (
        <div >
            <SearchBox
                styles={{ root: { width: 1300, borderWidth:2, borderRadius: "15px" } }}
                placeholder="Search"
                onSearch={newValue => handleSearchClick()}
                onChange={(_, newValue) => setSearch(newValue)}
            />

        </div>
        
    );
}


export default Search;