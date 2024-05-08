import React from 'react'

const Newpost = ({ handlesubmit,postTitle,setpostTitle,postbody,setpostbody}) => {
  return (
    <main className='NewPost'>
       <h2>New post</h2>
      <form className='newPostForm' onSubmit={handlesubmit}>
        <label htmlFor='postTitle'>Title</label>
        <input
           id='postTitle'
           type='text'
           required
           value={postTitle}
           onChange={(event)=>setpostTitle(event.target.value)}
        />
        <label htmlFor='postBody'>Post</label>
        <textarea
         id='postBody'
         required
         value={postbody}
         onChange={(e)=>setpostbody(e.target.value)}/>
         <button type='submit'>Submit</button>
 
 
      </form>
         
    </main>
  )
}

export default Newpost
