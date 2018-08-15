import React from "react";
import PropTypes from 'prop-types';

const Book = ({ book, onUpdateBookShelf }) => {
    const onBookShelfChange = (evt) => {
        let shelf = evt.target.value;
        onUpdateBookShelf && onUpdateBookShelf(book, shelf);
    }
    let backgroundImage = book.imageLinks && `url("${book.imageLinks.thumbnail}")`;
    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage
                    }}
                />
                <div className="book-shelf-changer">
                    <select onChange={onBookShelfChange} value={book.shelf}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">
                            Want to Read
                        </option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">
                {book.title}
            </div>
            <div className="book-authors">
                {book.authors && book.authors.join(', ')}
            </div>
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string),
        imageLinks: PropTypes.shape({
            thumbnail: PropTypes.string.isRequired
        }),
        shelf: PropTypes.string.isRequired,
    }).isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired
};

export default Book;