import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import StarRating from '../MultiUse/StarRating';
import Collapsible from '../MultiUse/Collapsible'
import EditForm from '../MultiUse/EditForm';
import axios from 'axios';
import './PersonalReviews.css'

const PersonalReviewes = ({auth}) => {

    const [personalReviews, setPersonalReviews] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        getPersonalReviews()
    }, []);

    async function getPersonalReviews(){
        try{
            let results= await axios.get(`http://127.0.0.1:5000/api/book/review`,{
                headers: {
                    Authorization: auth,
                },
            })
            console.log(results.data)
            setPersonalReviews(results.data)
        }catch(ex){
            console.log('error in submit')
        }
    }

    function close(junk){
        setEditIndex(-1)
    }

    function handleEdit(index){
        if(index !== editIndex){
            setEditIndex(index)
        }
        else{
            setEditIndex(-1)
        }
    }

    return (
        <div className='personal-reviews'>
            <h2>Books I have Reviewed</h2>
            <div className='rev-cards'>
                {personalReviews.length > 0 ?
                    personalReviews.map((rev, index) => {
                        return(
                            <div key={index}>
                                <div className='rev-card'>
                                    <div className='book-rating'>
                                        <Link to={`/detail/${rev.book_id}`}>
                                            <img src={rev.thumbnail_url} alt='book cover'/>
                                        </Link>
                                        <StarRating rating={rev.rating}  className="star-rating" changeAble={false} />
                                    </div>
                                    <div className='rev-text'>
                                        <p>{rev.review_text}</p>
                                        <button onClick={()=>handleEdit(index)} className='edit-button'>EDIT</button>
                                    </div>
                                </div>
                                <>
                                    <Collapsible show={index === editIndex}>
                                        <EditForm text={rev.review_text} startRating={rev.rating} auth={auth} close={close} bookId={rev.book_id} />
                                    </Collapsible>
                                </>
                            </div>
                        )
                    })
                :null}
            </div>
        </div>
    );
}

export default PersonalReviewes;