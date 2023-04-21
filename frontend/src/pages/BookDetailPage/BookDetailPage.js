import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BookDetails from '../../components/BookDetails/BookDetails';
import Favorite from '../../components/MultiUse/Favorite'
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
        getInfoFromAPI(bookId)
        getBookInfo(bookId)
    }, []);

    async function getInfoFromAPI(id){
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

    function categoryTags(){
        let listOfTags = bookInfo.volumeInfo.categories[0].split(' / ')
        if(listOfTags.length >0 ){
            return(
                listOfTags.map((category, index)=><div key={index} className='category-tag'>{category}</div>)
            )
        }
        else{
            return(<div className='no-tag'>No category tags</div>)
        }
    }

    return(
        <main className='book-content'>
            {bookInfo.length<=0 ? null:
            <>
            <BookDetails bookInfo={bookInfo} />
            <div className='more-info'>
                <div className='favorite-space'>
                    <Favorite bookInfo={bookInfo} auth={auth} isFavorited={customBookInfo.favorited} bookId={bookId} className='favorite' />
                    <p>Favorite</p>
                </div>
                <div className='category-space'>
                    <p>categories:</p>
                    <div className='tags'>
                        {categoryTags()}
                    </div>
                </div>
            </div>
            <Reviews auth={auth} bookId={bookId} allRev={customBookInfo.reviews} />
            </>}

        </main>
    )
}

export default BookDetailPage