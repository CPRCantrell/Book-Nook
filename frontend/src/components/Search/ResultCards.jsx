import React from 'react';
import { Link } from "react-router-dom";
import defaultCover from '../../Assests/default-book-cover.jpg'
import './ResultCards.css'

const ResultCards = ({bookResults}) => {

    function checkForImg(data){
        if(data.imageLinks){
            return(data.imageLinks.thumbnail)
        }
        return(defaultCover)
    }

    return (
        <div className='results'>
            {bookResults.map((book, index) => {
                return(
                    <Link key={index} to={`/detail/${book.id}`}>
                        <div className='card'>
                            <img src={checkForImg(book.volumeInfo)} alt={`${book.volumeInfo.title} cover`} className='thumbnail'/>
                            <div className='rating'>
                                <p>{book.volumeInfo.averageRating ? book.volumeInfo.averageRating:'No rating'} <span>&#9733;</span></p>
                            </div>
                            <div className='info'>
                                <h2>{book.volumeInfo.title}</h2>
                                <p>{book.volumeInfo.description}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default ResultCards;