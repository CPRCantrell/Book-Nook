import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BookDetails from '../../components/BookDetails/BookDetails';
import Reviews from '../../components/BookDetails/Reviews';
import useAuth from '../../hooks/useAuth'

const BookDetailPage = () => {

    const { bookId } = useParams();
    const [bookInfo, setBookInfo] = useState([]);
    // const [bookData, setBookData] = useState([])
    const [user, token] = useAuth()
    const auth = "Bearer " + token;

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
            {bookInfo.length<=0? null:
            <>
            <BookDetails bookInfo={bookInfo}/>
            <Reviews bookInfo={bookInfo} auth={auth} bookId={bookId}/>
            </>}

        </main>
    )
}

export default BookDetailPage