import React from 'react';
import PropTypes from 'prop-types';

import BookShelf from './BookShelf';

export default class BookShelfPage extends React.Component {

    shelves = {
        'currentlyReading': 'Currently Reading',
        'wantToRead': 'Want to Read',
        'read': 'Read'
    }

    filterBooksByShelf(books, shelf) {
        return books.filter(book => book.shelf === shelf)
    }

    render() {
        let { booksOnShelf } = this.props;
        let groupedBooks = Object.keys(this.shelves).reduce((memo, shelf) => {
            memo[shelf] = this.filterBooksByShelf(booksOnShelf, shelf);
            return memo;
        }, {});
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {Object.keys(this.shelves).map(shelf => {
                        let name = this.shelves[shelf];
                        let sectionBooks = groupedBooks[shelf];
                        return (
                            <BookShelf key={shelf}
                                name={name}
                                books={sectionBooks}
                                onUpdateBookShelf={this.props.onUpdateBookShelf} />
                        )
                    })}
                </div>
                <div className="open-search">
                    <a onClick={() => this.props.onAddBookClick()}>
                        Add a book
          </a>
                </div>
            </div>
        )
    }
}

BookShelfPage.propTypes = {
    booksOnShelf: BookShelf.propTypes.books,
    onUpdateBookShelf: BookShelf.propTypes.onUpdateBookShelf,
    onAddBookClick: PropTypes.func.isRequired
};