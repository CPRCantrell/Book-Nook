import React, { useState, useEffect }from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import './EditForm.css'

const EditForm = ({text, startRating, auth, bookId, close}) => {

    const [reviewText, setReviewText] = useState(text);
    const [rating, setRating] = useState(startRating);
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
        setConfirmation(false)
    }, [close]);

    function handleSubmit(){
        let editedReview={
            book_id: bookId,
            review_text: reviewText,
            rating: rating,
        }
        submit(editedReview)
        window.location.reload(false);
    }

    async function submit(editedReview){
        try{
            let results= await axios.put(`http://127.0.0.1:5000/api/book/review`, editedReview,{
                headers: {
                    Authorization: auth,
                },
            })
        }catch(ex){
            console.log('error in put')
        }
    }

    function handleCancelDelete(){
        setConfirmation(false)
    }

    function handleDelete(){
        deleteReview()
        window.location.reload(false);
    }

    async function deleteReview(){
        try{
            let results = await axios.delete(`http://127.0.0.1:5000//api/book/deleteReview/${bookId}`,{
                headers: {
                    Authorization: auth
                }
            })
        }catch(ex){
            console.log('error in delete')
        }
    }

    return (
        <div className='edit-form'>
            <div className={'edit-group text-edit'}>
                <label>Your Review</label>
                <textarea type='text' value={reviewText} onChange={(e)=>setReviewText(e.target.value)} rows='5'/>
            </div>
            <div className={'edit-group number-edit'}>
                <label>Your Rating:</label>
                <StarRating rating={rating} setRating={setRating} />
            </div>
            <div className='edit-button-space'>
                <button onClick={() => handleSubmit()}>Complete Edit</button>
                <button onClick={() => setConfirmation(!confirmation)}>Delete</button>
            </div>
            <>
                {confirmation ?
                <div className='confirmation-modal'>
                    <div className='confitmation-alert'>
                        <div className='message'>
                            <h3>- Once deleted there is no way of getting it back -</h3>
                            <p>Do you still want to delete your review?</p>
                            <div className='response'>
                                <button onClick={()=>handleCancelDelete()}>NO</button>
                                <button onClick={()=>handleDelete()}>YES</button>
                            </div>
                        </div>
                    </div>
                </div>
                :null}
            </>
        </div>
    );
}

export default EditForm;