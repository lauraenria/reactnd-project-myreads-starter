import React from "react";
import PropTypes from "prop-types";
import * as BooksAPI from './BooksAPI';

import { Debounce } from 'react-throttle';

import BooksGrid from './BooksGrid';

export default class SearchPage extends React.Component {
    state = {
        searchedBooks: [],
        loading: false,
        error: null
    }

    // Cached to get books by id and identify current shelf if applied 
    booksOnShelfCache = {}

    buildBookCache(booksOnShelf) {
        this.booksOnShelfCache = booksOnShelf.reduce((memo, book) => {
            memo[book.id] = book;
            return memo;
        }, {});
    }

    // Rebuild the cache when receive a change in booksOnShelf props 
    componentWillReceiveProps(nextProps) {
        this.buildBookCache(nextProps.booksOnShelf);
    }

    async onSearchInputChange(evt) {
        let text = evt.target.value;

        if (!text) {
            // Skip empty search
            return
        }
        this.setState({ loading: true });

        try {
            let response = await BooksAPI.search(text, 10);

            if (!response) {
                this.setErrorState("No books found.");
                return;
            }

            if (response.error) {
                this.setErrorState(response.error);
                return;
            }

            let searchedBooks = response.map(book => {
                let bookOnShelf = this.booksOnShelfCache[book.id];
                if (bookOnShelf) {
                    book.shelf = bookOnShelf.shelf;
                } else {
                    book.shelf = 'none';
                }
                return book;
            });

            this.setState({ searchedBooks, loading: false, error: null });
        } catch (e) {
            this.setErrorState(e.message);
        }
    }

    setErrorState(error) {
        this.setState({ searchedBooks: [], loading: false, error });
    }

    render() {
        let { searchedBooks, loading, error } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.props.onBackClick()}>
                        Close
                    </a>
                    <div className="search-books-input-wrapper">
                        <Debounce time="400" handler="onChange">
                            <input type="text" placeholder="Search by title or author"
                                onChange={this.onSearchInputChange.bind(this)}
                                disabled={loading} />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    {loading && <div className="search-books-loading">Searching books ...</div>}
                    {error && !loading && <div className="search-books-error">{error}</div>}
                    <BooksGrid books={searchedBooks} onUpdateBookShelf={this.props.onAddBookOnShelf} />
                </div>
            </div>
        )
    }
}

SearchPage.propTypes = {
    booksOnShelf: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
    })).isRequired,
    onAddBookOnShelf: BooksGrid.propTypes.onUpdateBookShelf,
    onBackClick: PropTypes.func.isRequired
};
