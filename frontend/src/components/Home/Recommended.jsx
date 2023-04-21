import React, { useState } from 'react';
import axios from 'axios';
const Recommended = () => {
    const [books,setBooks]=useState([])

    async function getBooks(){
        try{
            let results= await axios.get('http://127.0.0.1:5000/api/book/booksWithReviews')
            console.log(results)
        }catch(ex){
            console.log("issue with getBooks")
        }
    }

    function cards(){
        getBooks()
        return(
            <p>This is working!</p>
        )
    }

    return ( 
        <div>
            <div>Recommended!</div>
            <div>{cards()}</div>
        </div>
    );
}
 
export default Recommended;