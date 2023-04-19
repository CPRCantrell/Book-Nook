import React, { useState,useRef } from 'react';
import axios from 'axios'

const Reviews = ({bookData}) => {
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
    async function submit(review,token){
        try{
            let results= await axios.post(`http://127.0.0.1:5000/api/book/review/${review}`)
            
            
        }catch(ex){
            console.log('error in submit')
    }
    }
    function handleSubmit(event){
        event.preventDefault()
        let searchFor = lookFor.current.value.replace(' ','+')
        submit(searchFor,token)

    }
    function addReview(){
        if(button=="active"){
            return (
                <form>
                    <input type='text' ref={lookFor} />
                    <button type='submit'>submit review</button>
                </form>
            )
        }
    }
    return (  
        <div>
            {bookData.map((book)=><div>{book.reviews}</div>)}
            <div><button>Add To Favorites</button></div>
            <div>
                <button onClick={setState()}>Add Review</button>
                {}
            </div>
        </div>
    );
}
 
export default Reviews;