import React from "react";
import PropTypes from 'prop-types';

import Book from './Book';

const BooksGrid = ({ books, onUpdateBookShelf }) => {
    return (
        <ol className="books-grid">
            {books.map(book =>
                <li key={book.id}>
                    <Book book={book}
                        onUpdateBookShelf={onUpdateBookShelf} />
                </li>
            )}
        </ol>
    )
}

BooksGrid.propTypes = {
    books: PropTypes.arrayOf(Book.propTypes.book).isRequired,
    onUpdateBookShelf: Book.propTypes.onUpdateBookShelf
};

export default BooksGrid;