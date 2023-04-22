import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'
import ReviewForm from './ReviewForm';
import Collapsible from '../MultiUse/Collapsible';
import ReviewPosts from './ReviewPost';
import axios from 'axios'
import './Reviews.css'

// need username and token
const Reviews = ({auth, bookId, allRev, bookInfo, user}) => {

    const [addReviewForm ,setAddReviewForm]=useState(false)
    const [allReviews,setAllReviews]=useState(allRev)
    const [existReview, setExistReview] = useState((allRev.map((rev) => {if(rev.user_username === user){return true}}))[0])

    return (
        <div className='reviews'>
            <div className='interact'>
                {auth.length > 11 ?
                    (!existReview ? <button onClick={() =>setAddReviewForm(!addReviewForm)} className={addReviewForm ? 'on':'off'}>Add Review</button>:null)
                    :
                    <Link to='/login' className='link'>
                        <button className='off'>Add Review</button>
                    </Link>
                }
            </div>
            <Collapsible show={addReviewForm}>
                <ReviewForm allReviews={allReviews} setAllReviews={setAllReviews} bookId={bookId} auth={auth} bookInfo={bookInfo} close={setAddReviewForm} reviewSubmited={setExistReview} />
            </Collapsible>
            <div className='all-reviews'>
                {allReviews.length > 0 ? <ReviewPosts user={user} bookId={bookId} existReview={existReview} allReviews={allReviews} auth={auth}/>:<div className='no-reviews'>No Reviews</div>}
            </div>
        </div>
    );
}

export default Reviews;