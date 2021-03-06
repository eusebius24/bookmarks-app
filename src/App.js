import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import BookmarksContext from './BookmarksContext';
import EditBookmark from './EditBookmark/EditBookmark';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };



  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bm => 
      bm.id !== bookmarkId
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }

  editBookmark = bookmark => {
    console.log('bookmark:', bookmark);
    const editedBookmarks = this.state.bookmarks.map(bm => {
      if (bm.id === parseInt(bookmark.id)) {
        bm.title = bookmark.title;
        bm.url = bookmark.url;
        bm.description = bookmark.description;
        bm.rating = bookmark.rating;
        return bm;
      } else {
        return bm;
      }
      
    })
    console.log('editedBookmarks:', editedBookmarks);
    this.setState({
      bookmarks: editedBookmarks
    })
  }

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(bookmarks => {
        console.log(bookmarks)
        this.setBookmarks(bookmarks)
      })
      .catch(error => this.setState({ error }))
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      editBookmark: this.editBookmark,
    }
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarksContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
             path='/add-bookmark'
             component={AddBookmark}
              />

            <Route
             path='/bookmarks/:bookmark_id'
             component={EditBookmark}
              />

            <Route
              exact path = '/'
              component={BookmarkList}
              
              />
              
          </div>
        </BookmarksContext.Provider>
       
      </main>
    );
  }
}

export default App;
