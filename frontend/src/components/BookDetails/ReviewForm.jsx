import React, { useRef, useState } from 'react';
import StarRating from './StarRating';
import axios from "axios";
import './ReviewForm.css'

const ReviewForm = ({allReviews, setAllReviews, auth, bookId}) => {

    const reviewText = useRef()
    const [rating, setRating] = useState(null);

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
        <form className='review-form' onSubmit={e => handleSubmit(e)}>
            <div className={'rev-group text-review'}>
                <label>Your Review</label>
                <textarea type='text' ref={reviewText}/>
            </div>
            <div className={'rev-group number-review'}>
                <label>Your Rating:</label>
                <StarRating rating={rating} setRating={setRating} />
            </div>
            <button type='submit'>submit review</button>
        </form>
    );
}

export default ReviewForm;