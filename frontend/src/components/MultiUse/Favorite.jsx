import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import FavoriteIcon from '../../Assests/favorite.svg'
import axios from 'axios';
import './Favorite.css'

const Favorite = ({bookInfo, auth, isFavorited, bookId}) => {

    const firstLoad=useRef(true)
    const [favorite, setFavorite] = useState(isFavorited)

    useEffect(() => {
        if(!firstLoad.current){
            if(favorite){
                console.log(bookInfo.volumeInfo.title)
                let fav={
                    book_id:bookId,
                    title:bookInfo.volumeInfo.title,
                    thumbnail_url:bookInfo.volumeInfo.imageLinks.thumbnail
                }
                addToFavorites(fav)
            }
            else if(favorite){
                removeFromFavorites()
            }
        }
        else{
            firstLoad.current=false
        }
    }, [favorite]);


    async function addToFavorites(fav){
        try{
            let results = await axios.post('http://127.0.0.1:5000/api/book/favorite', fav,{
                headers: {
                    Authorization: auth,
                },
            })
        }catch(ex){
            console.log('error in submit')
        }
    }

    async function removeFromFavorites(fav){}

    function logged(){
        return(
            <img src={FavoriteIcon} alt='Favorite' className={`heart ${favorite ? 'fill':'empty'}`} onClick={()=>setFavorite(!favorite)}/>
        )
    }

    function notLogged(){
        return(
            <Link to='/login' className='link'>
                <img src={FavoriteIcon} alt='Favorite' className={'heart empty'} />
            </Link>
        )
    }

    return(
        <>
            {isFavorited === 'not_logged_in' ? notLogged():logged()}
        </>
    )
}

export default Favorite