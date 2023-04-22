import React, { useState } from 'react';
import StarRating from "../MultiUse/StarRating";
import defaultAvatar from "../../Assests/profile-default.jpg"
import editIcon from '../../Assests/three-dots.svg'
import './ReviewPost.css'
import Collapsible from '../MultiUse/Collapsible';
import EditForm from '../MultiUse/EditForm';

const ReviewPosts = ({user, existReview, allReviews, auth, bookId}) => {

    const [edit, setEdit] = useState(false);
    var userEditPage = {match: false}

    function renderEditButton(rev){
        userEditPage.match = true
        userEditPage.review_text = rev.review_text
        userEditPage.rating = rev.rating
        return(
            <button onClick={()=>setEdit(!edit)} className='edit'><img src={editIcon} alt='edit button'/></button>
        )
    }

    return (
        <>
            {allReviews.map((rev, index) => {
                return(
                    <>
                        <div className="review-card" key={index}>
                            <div className="user-info">
                                <img src={defaultAvatar} alt={`${rev.user_username} profile`} />
                                <h4>{rev.user_username}</h4>
                                <>
                                    {existReview?
                                        (rev.user_username === user ? (renderEditButton(rev)) : null)
                                    :null}
                                </>
                            </div>
                            <div className="review-rating">
                                <StarRating rating={rev.rating}  className="post-stars" changeAble={false} />
                            </div>
                            <div className="review-text">
                                <p>{rev.review_text}</p>
                            </div>
                        </div>
                        <>
                            {userEditPage.match ?
                                (<>
                                    <Collapsible show={edit}>
                                        <EditForm text={userEditPage.review_text} startRating={userEditPage.rating} auth={auth} bookId={bookId} close={edit}/>
                                    </Collapsible>
                                    <>
                                        {userEditPage.match = false}
                                    </>
                                </>)
                            :null}
                        </>
                    </>
                )
            })}
        </>
    );
}

export default ReviewPosts;