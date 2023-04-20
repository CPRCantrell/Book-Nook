import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './FavoriteBooks.css'

const FavoriteBooks = ({auth}) => {

    const [favoritebooks, setFavoritebooks] = useState([]);

    useEffect(() => {
        getFavoriteBooks()
    }, []);

    async function getFavoriteBooks(){
        try{
            let books = await axios.get('http://127.0.0.1:5000/api/book/favorite',{
            headers: {
                Authorization: auth,
            },
        })
        console.log(books.data)
        setFavoritebooks(books.data)
        } catch {
            console.log('error getting favorite books')
        }
    }

    return (
        <div>
            {favoritebooks.length > 0 ?
            favoritebooks.map((book, index) => {
                return(
                    <Link key={index} to={`/detail/${book.book_id}`}>
                        <div className='favorite-card'>
                            <img src={book.thumbnail_url} alt={`${book.title}`} />
                            <h2>{book.title}</h2>
                            <button>{'<3'}</button>
                        </div>
                    </Link>
                )
            })
            :null}
        </div>
    );
}

export default FavoriteBooks;