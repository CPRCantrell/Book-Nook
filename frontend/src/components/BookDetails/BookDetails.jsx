import React from 'react';
import defaultCover from '../../Assests/default-book-cover.jpg'
import './BookDetails.css'

const BookDetails = ({bookInfo}) => {
    function checkForImg(data){
        if(data.imageLinks){
            return(data.imageLinks.thumbnail)
        }

        return(defaultCover)
    }
    if(bookInfo.volumeInfo.description){
        return (
            <div className='book'>
                <div className='main'>
                    <img src={checkForImg(bookInfo.volumeInfo)} alt={`${bookInfo.volumeInfo.title} cover`} className='img'/>
                    <div className="img-filter"></div>
                    <img src={checkForImg(bookInfo.volumeInfo)} alt='' className='img-effect'/>
                </div>
                <div className='info'>
                    <h1 className='title'>{bookInfo.volumeInfo.title}</h1>
                    <h2 className='author'>{'By: '}
                        {bookInfo.volumeInfo.authors.map((author, index, authorsArray) => {
                            if(index !== authorsArray.length - 1){
                                return(`${author} & `)
                            }
                            else{
                                return(author)
                            }
                        })}
                    </h2>
                    <p className='discription' dangerouslySetInnerHTML={{ __html: bookInfo.volumeInfo.description }} />
                </div>
            </div>
        );
    }
    else{
        return (
            <div className='book'>
                <div className='main'>
                    <img src={checkForImg(bookInfo.volumeInfo)} alt={`${bookInfo.volumeInfo.title} cover`} className='img'/>
                    <div className="img-filter"></div>
                    <img src={checkForImg(bookInfo.volumeInfo)} alt='' className='img-effect'/>
                </div>
                <div className='info'>
                    <h1 className='title'>{bookInfo.volumeInfo.title}</h1>
                </div>
            </div>
        );
    }
}

export default BookDetails;