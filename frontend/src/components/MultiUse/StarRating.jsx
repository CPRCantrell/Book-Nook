import React, { useState } from 'react';
import './StarRating.css'

const StarRating = ({rating, setRating=null, className='', changeAble=true}) => {

    const [hover, setHover] = useState(null);

    return (
        <div className='star-area'>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1
                if(changeAble){
                    return(
                        <label key={ratingValue} className='rate-star'>
                            <input
                                type='radio'
                                name='rating'
                                value={ratingValue}
                                onClick={() => setRating(ratingValue)}
                            />
                            <span
                                className={`${className} pointer  ${ratingValue <= (hover||rating) ? 'star-on':'star-off'}`}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            >
                                &#9733;
                            </span>
                        </label>
                    )
                }
                else{
                    return(
                        <label key={ratingValue} className='rate-star'>
                            <input type='radio' name='rating' value={ratingValue} />
                            <span className={ `${className} ${ratingValue <= rating ? 'star-on':'star-off'}`}>&#9733;</span>
                        </label>
                    )
                }
            })}
        </div>
    );
}

export default StarRating;