import Favorite from '../../components/MultiUse/Favorite'
import './BookInteract.css'

const BookInteract = ({bookInfo, auth, isFavorited, bookId}) => {

    function categoryTags(){
        let listOfTags
        try{listOfTags = bookInfo.volumeInfo.categories[0].split(' / ')}
        catch{return(<div className='category-tag'>No category tags</div>)}
        if(listOfTags.length > 0 ){
            return(
                listOfTags.map((category, index)=><div key={index} className='category-tag'>{category}</div>)
            )
        }
        else{
            return(<div className='tag'>No category tags</div>)
        }
    }

    return (
        <div className='more-info'>
            <div className='favorite-space'>
                <Favorite bookInfo={bookInfo} auth={auth} isFavorited={isFavorited} bookId={bookId}/>
                <p>Favorite</p>
            </div>
            <div className='category-space'>
                <p>categories:</p>
                <div className='tags'>
                    {categoryTags()}
                </div>
            </div>
            <div className='publish-space'>
                <p>published</p>
                <span>{bookInfo.volumeInfo.publishedDate ? bookInfo.volumeInfo.publishedDate.split('-')[0]:'Unknown'}</span>
            </div>
        </div>
    );
}

export default BookInteract;