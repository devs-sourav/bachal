import React from 'react'
import { AiOutlineSearch } from 'react-icons/Ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';

const Search = () => {
  return (
    <div className='searchbox'>
        <input  type='text' placeholder='Search'/>
        <AiOutlineSearch className='searchicon'/>
        <BiDotsVerticalRounded className='Search_dot_icon'/>
    </div>
  )
}

export default Search