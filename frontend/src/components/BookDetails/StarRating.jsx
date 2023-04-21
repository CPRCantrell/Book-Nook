import React, { useState } from 'react';
import './StarRating.css'

const StarRating = ({rating, setRating}) => {

    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1

                return(
                    <label key={ratingValue} className='rate-star'>
                        <input
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <span
                            className={ratingValue <= (hover||rating) ? 'star-on':'star-off'}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        >
                            &#9733;
                        </span>
                    </label>
                )
            })}
        </div>
    );
}

export default StarRating;