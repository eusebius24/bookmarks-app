import React, { Component } from  'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config'
import './EditBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

function editBookmarkRequest(bookmark, cb) {
  const { title, url, description, rating } = bookmark;
  fetch(config.API_ENDPOINT + `/${bookmark.id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    }
  })
  .then(res => {
    if (!res.ok) {
      return res.json().then(error => Promise.reject(error))
    }
    return res.json()
  })
  .then(data => {
    title.value = bookmark.title;
    url.value = bookmark.url;
    description.value = bookmark.description;
    rating.value = bookmark.rating;
    this.context.editBookmark(data)
    this.props.history.push('/')
    
  })
  .catch(error => {
    console.error(error)
    this.setState({ error })
  })
}

class EditBookmark extends Component {
  static contextType = BookmarksContext;
  constructor(props) {
    super(props);
  }
  state = {
    error: null,
    id: '',
    title: '',
    description: '',
    rating: 1,
  };

  componentDidMount() {
    const { bookmarkId } = this.props.match.params;
    fetch(config.API_ENDPOINT + `${bookmarkId}`, {
      method: 'GET'
    })
    .then(res => {
      if(!res.ok) 
        return res.json().then(error => Promise.reject(error))
      return res.json()
    })
    .then(responseData => {
      this.setState({
        id: responseData.id,
        title: responseData.title,
        url: responseData.url,
        description: responseData.description
      })
    })
    

  }

  // handleSubmit = e => {
  //   e.preventDefault()
  //   // get the form fields from the event
  //   const { title, url, description, rating } = e.target
  //   const bookmark = {
  
  //     title: title.value,
  //     url: url.value,
  //     description: description.value,
  //     rating: rating.value,
  //   }
  //   this.setState({ error: null })
  //   fetch(config.API_ENDPOINT + `/${bookmark.id}`, {
  //     method: 'PATCH',
  //     body: JSON.stringify(bookmark),
  //     headers: {
  //       'content-type': 'application/json',
        
  //     }
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         // get the error message from the response,
  //         return res.json().then(error => {
  //           // then throw it
  //           throw error
  //         })
  //       }
  //       return res.json()
  //     })
  //     .then(data => {
  //       title.value = bookmark.title;
  //       url.value = bookmark.url;
  //       description.value = bookmark.description;
  //       rating.value = bookmark.rating;
  //       this.context.editBookmark(data)
  //       this.props.history.push('/')
        
  //     })
  //     .catch(error => {
  //       this.setState({ error })
  //     })
  // }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const { error } = this.state
    const currentId = this.props.match.params.bookmark_id
    const bookmark = this.context.bookmarks[currentId - 1];
   console.log('bookmark:', bookmark)
    if(!bookmark) {
      return <p>Loading...</p>
    }
    return (
      <section className='EditBookmark'>
        <h2>Edit a bookmark</h2>
        <form
          className='AddBookmark__form'
          
        >
          <div className='AddBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              defaultValue={bookmark.title}
              placeholder={bookmark.title}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              defaultValue={bookmark.url}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              defaultValue={bookmark.description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue={bookmark.rating}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel} >
              Cancel
            </button>
            {' '}
            <button onClick={!bookmark ? null : editBookmarkRequest(bookmark, this.context.editBookmark)}>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;
