import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import defaultCover from '../../Assests/default-book-cover.jpg'
import axios from "axios";
import './NewBoard.css'

const NewBoard = () => {

    const [newBookList, setNewBookList] = useState([]);
    const letterOptions = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    useEffect(() => {
        let randomLetter = letterOptions[Math.floor(Math.random()*letterOptions.length)]
        getNewBooks(randomLetter)
    }, []);

    async function getNewBooks(letter){
        try{
            console.log(letter)
            let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${letter}&orderBy=newest&maxResults=5`)
            setNewBookList(books.data.items)
        }
        catch{
            console.log('Error getting new books')
        }
    }

    function validateImg(book){
        if(book.imageLinks){
            return book.imageLinks.thumbnail
        }
        else{
            return defaultCover
        }
    }

    return (
        <div className="new-board">
            <h2>See What is New!</h2>
            <div className="new-display">
                {newBookList.length > 0 ?
                    newBookList.map((book,index) => {
                        let id = book.id
                        book = book.volumeInfo
                        return(
                            <Link to={`/detail/${id}`} key={index} className="new-card">
                                <img src={validateImg(book)} alt={`${book.title} Cover`} />
                            </Link>
                        )
                    })
                :null}
            </div>
        </div>
    );
}

export default NewBoard;