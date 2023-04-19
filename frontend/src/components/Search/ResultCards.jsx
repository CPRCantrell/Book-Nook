import React from 'react';
import './ResultCards.css'

const ResultCards = ({bookResults}) => {
    return (
        <div className='results'>
            {bookResults.map((book) => {
                return(
                    <div className='card'>
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={`${book.volumeInfo.title} cover`} className='thumbnail'/>
                        <div className='info'>
                            <h2>{book.volumeInfo.title}</h2>
                            <p>{book.volumeInfo.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default ResultCards;