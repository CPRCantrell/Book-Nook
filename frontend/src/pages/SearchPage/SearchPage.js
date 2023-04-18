import React, { useState } from 'react';
import SearchArea from '../../components/Search/SearchArea';
import './SearchPage.css'

const SearchPage = () => {

    const [booksResults, setBooksResults] = useState([]);

    return(
        <main className='content'>
            <SearchArea setBookResults={setBooksResults}/>
        </main>
    )
}

export default SearchPage