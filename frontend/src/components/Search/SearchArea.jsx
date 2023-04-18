import React, { useRef } from "react";
import './SearchArea.css';

import axios from 'axios'

const SearchArea = ({setBookResults}) => {

    const lookFor = useRef('')

    function handleSubmit(event){
        event.preventDefault()
        let searchFor = lookFor.target.value.replace(' ','+')
    }

    return (
        <div className="search-area">
            <form className="search-bar" onSubmit={e => handleSubmit(e)}>
                <button type="submit">Search</button>
                <input type='text' ref={lookFor} placeholder="Search"/>
            </form>
            <button className="filter">Filter</button>
        </div>
    );
}

export default SearchArea;{}