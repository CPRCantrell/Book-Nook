import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Favorite = ({bookInfo, auth, isFavorited, bookId}) => {

    const firstLoad=useRef(true)
    const [favorite, setFavorite] = useState(isFavorited)

    useEffect(() => {
        if(!firstLoad.current){
            if(!(favorite === 'not_logged_in')){
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
                    // removeFromFavorites()
                }
            }
            else{
                //do other thing
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

    return(
        <>
            <button onClick={()=>setFavorite(!favorite)}>Add To Favorites</button>
        </>
    )
}

export default Favorite