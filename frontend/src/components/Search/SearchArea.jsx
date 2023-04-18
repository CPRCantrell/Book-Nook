import React, { useRef } from "react";
import './SearchArea.css';

import axios from 'axios'

const SearchArea = ({setBookResults}) => {

    const lookFor = useRef()
    async function results(searchRequest){
        try{
            let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchRequest}`)
            console.log(books.data.items)
            setBookResults(books.data.items)
        }catch(ex){
            console.log('error in handleSubmit')
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        let searchFor = lookFor.current.value.replace(' ','+')
        results(searchFor)

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