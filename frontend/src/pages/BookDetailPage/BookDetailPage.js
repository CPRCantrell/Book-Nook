import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BookDetails from '../../components/BookDetails/BookDetails';
import BookInteract from '../../components/BookDetails/BookInteract';
import Reviews from '../../components/BookDetails/Reviews';
import useAuth from '../../hooks/useAuth'
import './BookDetailPage.css'


const BookDetailPage = () => {

    const { bookId } = useParams();
    const [bookInfo, setBookInfo] = useState([]);
    const [customBookInfo, setCustomBookInfo] = useState([]);
    const [user, token] = useAuth()
    const auth = "Bearer " + token;

    useEffect(() => {
        getInfoFromAPI()
        getBookInfo()
    }, []);

    async function getInfoFromAPI(){
        try{
            let response = await axios.get(`http://127.0.0.1:5000/api/book/info/${bookId}`,{
                headers:{
                    Authorization: auth,
                },
            })
            console.log(response.data)
            setCustomBookInfo(response.data)
        }
        catch{
            console.log('error in collecting data')
        }
    }

    async function getBookInfo(){
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
        <main className='book-content'>
            {bookInfo.length<=0 ? null:
            <>
                <BookDetails bookInfo={bookInfo} />
                <BookInteract bookInfo={bookInfo} auth={auth} isFavorited={customBookInfo.favorited} bookId={bookId} />
                <Reviews auth={auth} bookId={bookId} allRev={customBookInfo.reviews} />
            </>}

        </main>
    )
}

export default BookDetailPage