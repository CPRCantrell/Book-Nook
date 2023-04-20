import React, { useState, useRef } from 'react';
import axios from 'axios'
// need username and token
const Reviews = ({auth, bookId, allRev}) => {

    const reviewText = useRef()
    const rating=useRef()
    const [addReviewForm ,setAddReviewForm]=useState(false)
    const [allReviews,setAllReviews]=useState(allRev)

    function addReview(){
        return (
            <form onSubmit={e => handleSubmit(e)}>
                <input type='text' ref={reviewText} />
                <input type='text' ref={rating}/>
                <button type='submit'>submit review</button>
            </form>
        )
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

    async function submit(review){
        try{
            let results= await axios.post(`http://127.0.0.1:5000/api/book/review`, review,{
                headers: {
                    Authorization: auth,
                },
            })
            let tempHold = [...allReviews, results.data]
            setAllReviews(tempHold)
        }catch(ex){
            console.log('error in submit')
        }
    }


    return (
        <div>
            <div>
                <button onClick={() =>setAddReviewForm(!addReviewForm)}>Add Review</button>
            </div>
            <div>
                {addReviewForm ? addReview():null}
            </div>
            <div>
                {allReviews.length>0 ? allReviews.map((rev,index) => {
                    return(
                        <div key={index}>
                            <div>{rev.user_username}</div>
                            <div>{rev.rating}</div>
                            <div>{rev.review_text}</div>
                        </div>
                    )
                }):null}
            </div>
        </div>
    );
}

export default Reviews;