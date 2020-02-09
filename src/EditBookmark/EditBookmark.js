import React from 'react';
import BookmarksContext from '../BookmarksContext';
import config from '../config';
import './EditBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends React.Component {
  static contextType = BookmarksContext;

  state = {
    error: null,
    id: '',
    title: '',
    url: '',
    description: '',
    rating: ''
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  handleOnChangeTitle = e => {
    this.setState({
      title: e.target.value
    })
  }

  ComponentDidMount() {
    const { bookmark_id } = this.props.match.params 
    fetch(config.API_ENDPOINT + `${bookmark_id}`, {
      method: 'GET',
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => console.error);
      }
      return res.json()
    })
      .then(responseData => {
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
    const { error, title, url, description, rating } = this.state;
    
    
    return (
    
      <section className="AddBookmark">
        <h2>Edit bookmark</h2>
        <form className="AddBookmark__form">
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
               value={title}
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
             />
           </div> 
           <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
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
              defaultValue='1'
              min='1'
              max='5'
              required
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