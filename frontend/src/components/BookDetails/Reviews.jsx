import React, { useState, useRef } from 'react';
import ReviewForm from './ReviewForm';
import Collapsible from '../MultiUse/Collapsible';
import axios from 'axios'
import './Reviews.css'

// need username and token
const Reviews = ({auth, bookId, allRev, bookInfo}) => {

    const [addReviewForm ,setAddReviewForm]=useState(false)
    const [allReviews,setAllReviews]=useState(allRev)


    return (
        <div className='reviews'>
            <div className='interact'>
                <button onClick={() =>setAddReviewForm(!addReviewForm)} className={addReviewForm ? 'on':'off'}>Add Review</button>
            </div>
            <Collapsible show={addReviewForm}>
                <ReviewForm allReviews={allReviews} setAllReviews={setAllReviews} bookId={bookId} auth={auth} bookInfo={bookInfo}/>
            </Collapsible>
            <div className='all-reviews'>
                {allReviews.length>0 ? allReviews.map((rev,index) => {
                    return(
                        <div key={index}>
                            <div>{rev.user_username}</div>
                            <div>{rev.rating}</div>
                            <div>{rev.review_text}</div>
                        </div>
                    )
                }):<div className='no-reviews'>No Reviews</div>}
            </div>
        </div>
    );
}

export default Reviews;