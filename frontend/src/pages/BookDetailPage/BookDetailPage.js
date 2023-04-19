import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BookDetailPage = () => {

    const { bookId } = useParams();
    const [bookInfo, setBookInfo] = useState([]);

    useEffect(() => {
        getBookInfo(bookId)
    }, []);

    async function getBookInfo(id){
        try{
            let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            console.log(response.data)
            setBookInfo(response.data)
        }
        catch{
            console.log('error in collecting data')
        }
    }

    return(
        <main>
        </main>
    )
}

export default BookDetailPage