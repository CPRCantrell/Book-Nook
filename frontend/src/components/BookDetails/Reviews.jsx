import React, { useState,useRef,useEffect } from 'react';
import axios from 'axios'
// need username and token
const Reviews = ({bookInfo, auth, bookId}) => {

    const reviewText = useRef()
    const rating=useRef()
    const [addReviewForm ,setAddReviewForm]=useState(false)
    const [favorite, setFavorite] = useState(false);
    const [allReviews,setAllReviews]=useState([])
    const firstLoad=useRef(true)


    useEffect(() => {
        console.log("useEffect ran")
        getAllReviews()
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
            else{
                console.log('remove from fav')
                // removeFromFavorites()
            }
        }
        else{
            console.log("swicthed first load")
            firstLoad.current=false
        }
    }, [favorite]);

    
    async function addToFavorites(fav){
        try{
            let results= await axios.post(`http://127.0.0.1:5000/api/book/favorite`,fav,{
                headers: {
                    Authorization: auth,
                },
            })
        }catch(ex){
            console.log('error in submit')
        }
    }
    

    async function submit(review){
        try{
            let results= await axios.post(`http://127.0.0.1:5000/api/book/review`,review,{
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
        let review={
            book_id:bookId,
            review_text:reviewText.current.value,
            rating:parseInt(rating.current.value)
        }
        submit(review)

    }

    function addReview(){
        
            return (
                <form onSubmit={e => handleSubmit(e)}>
                    <input type='text' ref={reviewText} />
                    <input type='text' ref={rating}/>
                    <button type='submit'>submit review</button>

                </form>
            )
        
    }

    async function getAllReviews(){
        try{
            let results= await axios.get(`http://127.0.0.1:5000/api/book/info/${bookId}`,{
                headers: {
                    Authorization: auth,
                },
            })
            console.log(bookId)
            console.log(results)
            console.log(results.data.reviews)
            setAllReviews(results.data.reviews)
        }catch(ex){
            console.log('error in submit')
        }
    }
    
    return (
        <div>
            {/* {allReviews.map((rev)=><div>{rev.reviews}</div>)} */}
            <div><button onClick={()=>setFavorite(!favorite)}>Add To Favorites</button></div>
            <div>
                <button onClick={() =>setAddReviewForm(!addReviewForm)}>Add Review</button>
            </div>
            <div>
                {addReviewForm?addReview():null}
            </div>
            <div>{allReviews.length>0?allReviews.map((rev,index)=>{
                return(
                    <div key={index}>
                        <div>{rev.user_username}</div>
                        <div>{rev.rating}</div>
                        <div>{rev.review_text}</div>
                    </div>
                )
                }):<div></div>}
            </div>
        </div>
    );
}

export default Reviews;