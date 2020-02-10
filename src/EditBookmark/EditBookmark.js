import React from 'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './EditBookmark.css';
import { Route } from 'react-router-dom';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)


class EditBookmark extends React.Component {
  static contextType = BookmarksContext;
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      id: '',
      title: '',
      url: '',
      description: '',
      rating: ''
    }

    this.handleClickCancel.bind(this);
    this.handleOnChangeTitle.bind(this);
    this.handleOnChangeURL.bind(this);
    this.handleOnChangeDescription.bind(this);
    this.handleOnChangeRating.bind(this);
    this.resetFields.bind(this);
  }

  

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleOnChangeTitle = e => {
    this.setState({
      title: e.target.value
    })
  }

  handleOnChangeURL = e => {
    this.setState({
      url: e.target.value
    })
  }

  handleOnChangeDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  handleOnChangeRating = e => {
    this.setState({
      rating: e.target.value
    })
  }

  resetFields = bookmark => {
    this.setState({
      id: bookmark.id || '',
      title: bookmark.title || '',
      url: bookmark.url || '',
      description: bookmark.description || '',
      rating: bookmark.rating || '',
    })
  }

  editBookmarkRequest = (e) => {
    e.preventDefault();
    const { bookmark_id }= this.props.match.params;
    console.log(this.state, bookmark_id);
    
    const bookmark = {
      id: bookmark_id,
      title: this.state.title,
      url: this.state.url,
      description: this.state.description,
      rating: this.state.rating,
    }
    fetch(config.API_ENDPOINT + `/${bookmark_id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => console.error);
      }
      
    })
    .then(() => {
      console.log("bookmark:", bookmark);
      // this.resetFields(bookmark)
      this.context.editBookmark(bookmark)
      this.props.history.push('/')
    }
     
    )
  }

  componentDidMount() {
    console.log('hello');
    const { bookmark_id } = this.props.match.params 
    fetch(config.API_ENDPOINT + `/${bookmark_id}`, {
      method: 'GET',
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => console.error);
      }
      return res.json();
    })
      .then(responseData => {
        console.log('responseData:', responseData);
        this.setState({
          id: responseData.id,
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({ error })
      })
  
  }
  render() {
    
    console.log(this.state.title);
    return (
    
      <section className="AddBookmark">
        <h2>Edit bookmark</h2>
        <form className="AddBookmark__form" onSubmit={this.editBookmarkRequest}>
          <div className='AddBookmark__error' role='alert'>
              
            </div>
           <div>
             <label htmlFor="title">
             Title
              {' '}
              <Required />
             </label>
             <input 
               type='text'
               name='title'
               id='title'
               value={this.state.title}
               onChange = {this.handleOnChangeTitle}
             />
           </div> 
           <div>
             <label htmlFor="url">
             URL
              {' '}
              <Required />
             </label>
             <input 
               type='url'
               name='url'
               id='url'
               value={this.state.url}
               onChange={this.handleOnChangeURL}
             />
           </div> 
           <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={this.state.description}
              onChange={this.handleOnChangeDescription}
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
              min='1'
              max='5'
              required
              value={this.state.rating}
              onChange={this.handleOnChangeRating}
            />
            </div>
            <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
            </div>
        </form>
      </section>
      

    );
      
  }

}


export default EditBookmark;