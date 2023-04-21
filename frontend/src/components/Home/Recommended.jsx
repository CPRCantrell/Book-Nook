import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Recommended = () => {
    const [bookResults,setBookResults]=useState([])

    async function getBooks(){
        try{
            let results= await axios.get('http://127.0.0.1:5000/api/book/booksWithReviews')
            console.log(results)
            setBookResults(results.data)

        }catch(ex){
            console.log("issue with getBooks")
        }
    }

    function checkForImg(){
        if(bookResults.thumbnail_url!=null){
            return(bookResults.thumbnail_url)
        }
        return("no Image")
    }

    function cards(){
        getBooks()
        return (
            <div >
                {bookResults.map((book, index) => {
                    return(
                        <Link key={index} to={`/detail/${book.book_id}`}>
                            <div >
                                <img src={checkForImg()}/>
                                <div className='rating'>
                                    {/* <p>{book.volumeInfo.averageRating ? book.volumeInfo.averageRating:'No rating'} <span>&#9733;</span></p> */}
                                </div>
                                <div className='info'>
                                    <h2>{book.title}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: book.review_text }} />
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        );
    }
            
        
    

    return ( 
        <div>
            <div>Recommended!</div>
            <div>{cards()}</div>
        </div>
    );
}
 
export default Recommended;