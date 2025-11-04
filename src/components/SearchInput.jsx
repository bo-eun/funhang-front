import React from 'react';
import searchbtn from "../assets/img/search_btn.svg"
function SearchInput(props) {
    return (
        <div className='search_box'>
            <input type="text" name="search" id="search" className='search_input' />
            <button type="submit">
                <img src={searchbtn} alt="검색" />
            </button>
        </div>
    );
}

export default SearchInput;