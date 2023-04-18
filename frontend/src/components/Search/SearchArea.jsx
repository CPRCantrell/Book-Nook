import React, { useRef } from "react";
import './SearchArea.css';

import axios from 'axios'

const SearchArea = ({setBookResults}) => {

    const lookFor = useRef('')
    async function results(searchRequest){
        try{
            let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchRequest}`)
            console.log(books)
            setBookResults(books)
        }catch(ex){
            console.log('error in handleSubmit')
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        let searchFor = lookFor.target.value.replace(' ','+')
        results(searchFor)

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