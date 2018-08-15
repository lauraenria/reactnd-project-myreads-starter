import React from 'react';
import PropTypes from 'prop-types';

import BooksGrid from './BooksGrid';

const BookShelf = ({ name, books, onUpdateBookShelf }) => {
    return (
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    {books.length > 0 ?
                        <BooksGrid books={books}
                            onUpdateBookShelf={onUpdateBookShelf} />
                        :
                        <h3> No books on this section </h3>
                    }

                </div>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: BooksGrid.propTypes.books,
    onUpdateBookShelf: BooksGrid.propTypes.onUpdateBookShelf
};

export default BookShelf;