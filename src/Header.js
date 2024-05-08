import React from 'react'
import { FaLaptop ,FaTabletAlt,FaMobileAlt }  from "react-icons/fa";

const Header = ({title , width}) => {
  return (
    <header className='Header'>
        <h1>{title}</h1>
        {width < 776 ? <FaMobileAlt/> : width < 995  ? <FaTabletAlt/> : <FaLaptop/> }
    </header>
  )
}


export default Header
