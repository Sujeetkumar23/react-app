import React from 'react'
import { Link, useParams} from 'react-router-dom'

const Postpage = ({posts,handleDelete}) => {
 const {id} =useParams();
 const post =posts.find(post=>(post.id).toString()===id)

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
        <>
        <h2>{post.title}</h2>
        <p className='postDate'>{post.datetime}</p>
        <p className='postBody'>{post.body}</p>
         <button className='deleteButton' onClick={() => handleDelete(post.id)}>DELETE POST</button>
         </>
        }
        {!post && 
           <>
           <h2>post not found</h2>
           <p>viste to home page</p>
           </>
         
          }

      </article>
        
        
    </main>
  )
}

export default Postpage
