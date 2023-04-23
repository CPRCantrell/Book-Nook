import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Favorite from '../MultiUse/Favorite'
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
        <div className='favorite-books'>
            <h2>My Favorite Books</h2>
            <div className='cards-display'>
                {favoritebooks.length > 0 ?
                favoritebooks.map((book, index) => {
                    return(
                        <div key={index} className='favorite-card'>
                            <Link to={`/detail/${book.book_id}`}>
                                <img src={book.thumbnail_url} alt={`${book.title}`} />
                            </Link>
                            <div className='heart-icon'>
                                <Favorite bookInfo={{volumeInfo:{title:book.title, imageLinks:{thumbnail:book.thumbnail_url}}}} auth={auth} isFavorited={true} bookId={book.book_id} className='heart-button'/>
                            </div>
                        </div>
                    )
                })
                :null}
            </div>
        </div>
    );
}

export default FavoriteBooks;