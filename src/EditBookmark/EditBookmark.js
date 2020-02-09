import React from 'react';
import BookmarksContext from '../BookmarksContext';
import './EditBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends React.Component {
  static contextType = BookmarksContext;

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  render() {
    const currentId = this.props.match.params.bookmark_id;
    const bookmark = this.context.bookmarks[currentId - 1];
    
    console.log('bookmark:', bookmark);
    console.log(this.context.bookmarks[currentId - 1].title);
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