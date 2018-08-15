import React from "react";
import "./App.css";
import { Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./SearchPage";
import BookShelfPage from "./BookShelfPage";

class BooksApp extends React.Component {
  state = {
    booksOnShelf: [],
    loading: false,
    showSearchPage: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    let booksOnShelf = await BooksAPI.getAll();
    this.setState({ booksOnShelf, loading: false });
  }

  async updateBookOnShelf(book, shelf) {
    let { booksOnShelf } = this.state;
    let bookOnShelf = booksOnShelf.filter(
      bookOnShelf => bookOnShelf.id === book.id
    )[0];

    if (bookOnShelf) {
      bookOnShelf.shelf = shelf;
      this.setState({ booksOnShelf });
    } else {
      book.shelf = shelf;
      this.setState({
        booksOnShelf: booksOnShelf.concat(book)
      });
    }

    await BooksAPI.update(book, shelf);
  }

  goToSearch(history) {
    history.push("/search");
  }

  goToShelf(history) {
    history.push("/");
  }

  render() {
    let { booksOnShelf, loading } = this.state;
    return (
      <div className="app">
        {loading && (
          <div className="app-loading-bar">Loading your bookshelf...</div>
        )}

        <Router>
          <div>
            <Route
              exact
              path="/"
              render={({ history }) => (
                <BookShelfPage
                  booksOnShelf={booksOnShelf}
                  onUpdateBookShelf={(book, shelf) =>
                    this.updateBookOnShelf(book, shelf)
                  }
                  onAddBookClick={() => this.goToSearch(history)}
                />
              )}
            />
            <Route
              exact
              path="/search"
              render={({ history }) => (
                <SearchPage
                  booksOnShelf={booksOnShelf}
                  onAddBookOnShelf={(book, shelf) =>
                    this.updateBookOnShelf(book, shelf)
                  }
                  onBackClick={() => this.goToShelf(history)}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
