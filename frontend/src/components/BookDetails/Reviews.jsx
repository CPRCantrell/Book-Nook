import React, { useState,useRef } from 'react';
import axios from 'axios'
// need username and token
const Reviews = ({bookData, auth, bookId}) => {

    const lookFor = useRef()
    const [button ,setButton]=useState("inactive")
    console.log('reviews')

    function setState(){
        if(button=="inactive"){
            setButton("active")
        }
        if(button=="active"){
            setButton("inactive")
        }
    }

    async function submit(review){
        try{
            let results= await axios.post(`http://127.0.0.1:5000/api/book/review/${review}`,{
                headers: {
                    Authorization: auth,
                },
            })
        }catch(ex){
            console.log('error in submit')
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        let searchFor = lookFor.current.value
        submit(searchFor)

    }

    function addReview(){
        if(button=="active"){
            return (
                <form onSubmit={e => handleSubmit(e)}>
                    <input type='text' ref={lookFor} />
                    <button type='submit'>submit review</button>
                </form>
            )
        }
    }

    async function addFav(){
        try{
            let results= await axios.post(`http://127.0.0.1:5000/api/book/favorite`,{
                headers: {
                    Authorization: auth,
                },
            },bookData)
        }catch(ex){
            console.log('error in submit')
        }
    }
    return (
        <div>
            {bookData.map((book)=><div>{book.reviews}</div>)}
            <div><button onClick={()=>addFav()}>Add To Favorites</button></div>
            <div>
                <button onClick={() => setState()}>Add Review</button>
            </div>
        </div>
    );
}

export default Reviews;