import React, { useState } from 'react';
import SearchArea from '../../components/Search/SearchArea';
import './SearchPage.css'
import ResultCards from '../../components/Search/ResultCards';

const SearchPage = () => {

    const [booksResults, setBooksResults] = useState([]);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    return(
        <main className='content'>
            <SearchArea setBookResults={setBooksResults} setFilterMenu={setShowFilterMenu} filter={showFilterMenu} />
            <ResultCards bookResults={booksResults} />
        </main>
    )
}

export default SearchPage