import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search,setsearch}) => {
  return (
   <nav className='Nav'>
     <form className='searchForm ' onSubmit={(e)=>{e.preventDefault()}}>
      <label htmlFor='search'>searchpost</label>
      <input
       id='search'
       type='text'
       placeholder='search'
       value={search}
       onChange={(e)=>setsearch(e.target.value)}
      />
      </form>
     <ul>
      <li><Link to='/' >Home</Link></li>
      <li><Link to='post'>Post</Link></li>
      <li><Link to='about'>About</Link></li>
     </ul>
   </nav>
  )
}

export default Nav
