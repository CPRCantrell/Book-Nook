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
            <form onSubmit={e => handleSubmit(e)}>
                <div className="search-bar">
                    <input type='text' ref={lookFor} placeholder="Search"/>
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
    );
}

export default SearchArea;{}