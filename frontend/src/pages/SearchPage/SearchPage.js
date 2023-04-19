import React, { useState } from 'react';
import SearchArea from '../../components/Search/SearchArea';
import './SearchPage.css'

const SearchPage = () => {

    const [booksResults, setBooksResults] = useState([]);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    return(
        <main className='content'>
            <SearchArea setBookResults={setBooksResults} setFilterMenu={setShowFilterMenu} filter={showFilterMenu} />
        </main>
    )
}

export default SearchPage