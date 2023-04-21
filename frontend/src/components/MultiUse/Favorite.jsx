import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import FavoriteIcon from '../../Assests/favorite.svg'
import NotFavoriteIcon from '../../Assests/not-favorite.svg'
import axios from 'axios';
import './Favorite.css'

const Favorite = ({bookInfo, auth, isFavorited, bookId, className, user}) => {

    const firstLoad=useRef(true)
    const [favorite, setFavorite] = useState(isFavorited)

    useEffect(() => {
        if(!firstLoad.current){
            if(favorite){
                let fav={
                    book_id:bookId,
                    title:bookInfo.volumeInfo.title,
                    thumbnail_url:bookInfo.volumeInfo.imageLinks.thumbnail
                }
                addToFavorites(fav)
            }
            else{
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
                    Authorization: auth
                }
            })
        }catch(ex){
            console.log('error in add to fav submit')
        }
    }

    async function removeFromFavorites(noFav){
        try{
            let results = await axios.delete(`http://127.0.0.1:5000//api/book/deleteFavorite/${bookId}`,{
                headers: {
                    Authorization: auth
                }
            })
        }catch(ex){
            console.log('error in remove from fav submit')
        }
    }

    function logged(){
        return(
            <img src={favorite ? FavoriteIcon:NotFavoriteIcon} alt='Favorite' className={`heart ${className} ${favorite ? 'fill':'empty'}`} onClick={()=>setFavorite(!favorite)}/>
        )
    }

    function notLogged(){
        return(
            <Link to='/login' className='link'>
                <img src={NotFavoriteIcon} alt='Favorite' className={`heart empty ${className}`} />
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