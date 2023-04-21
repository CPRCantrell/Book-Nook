import Reac, { useRef } from 'react';
import axios from "axios";
import './ReviewForm.css'

const ReviewForm = ({allReviews, setAllReviews, auth, bookId, bookInfo}) => {

    const reviewText = useRef()
    const rating=useRef()

    function handleSubmit(event){
        event.preventDefault()
        let review={
            book_id:bookId,
            review_text:reviewText.current.value,
            rating:parseInt(rating.current.value),
            thumbnail_url:bookInfo.volumeInfo.thumbnail
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
        <form onSubmit={e => handleSubmit(e)}>
            <input type='text' ref={reviewText} />
            <input type='text' ref={rating}/>
            <button type='submit'>submit review</button>
        </form>
    );
}

export default ReviewForm;