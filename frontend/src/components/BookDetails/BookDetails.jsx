import React, { useState } from 'react';
import defaultCover from '../../Assests/default-book-cover.jpg'

const BookDetails = ({bookInfo}) => {
    function checkForImg(data){
        if(data.imageLinks){
            return(data.imageLinks.thumbnail)
        }

        return(defaultCover)
    }
    return (  
        <div className='card'>
            <img src={checkForImg(bookInfo.volumeInfo)} alt={`${bookInfo.volumeInfo.title} cover`} className='thumbnail'/>
            <div className='info'>
                <h2>{bookInfo.volumeInfo.title}</h2>
                <p>{bookInfo.volumeInfo.description}</p>
            </div>
        </div>
    );
}
 
export default BookDetails;