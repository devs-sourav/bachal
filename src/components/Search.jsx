import React from 'react'
import { AiOutlineSearch } from 'react-icons/Ai';
import { BsThreeDotsVertical } from 'react-icons/Bs';

const Search = () => {
  return (
    <div className='searchbox'>
        <input  type='text' placeholder='Search'/>
        <AiOutlineSearch className='searchicon'/>
        <BsThreeDotsVertical className='Search_dot_icon'/>
    </div>
  )
}

export default Search