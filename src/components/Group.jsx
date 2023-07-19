import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/Bs'
import Group1Pic from '../assets/group_1.png'

const Group = () => {
  return (
    <div className='group_container'>
      <div className='heading'>
        <h3>Groups List</h3>
        <BsThreeDotsVertical className='group_dot_icon'/>
      </div>
      <div className='group_menu_container'>
        <div className='group_menu'>
          <div className='group_info'>
            <div className='group_profile_pic'>
              <img src={Group1Pic}/>
            </div>
            <div className='group_title'>
              <h3>Friends Forever</h3>
              <p>We are unbeatable</p>
            </div>
          </div>
          <div className='group-btn-cont'>
            <button>Join</button>
          </div>
        </div>
        <div className='group_menu'>
          <div className='group_info'>
            <div className='group_profile_pic'>
              <img src={Group1Pic}/>
            </div>
            <div className='group_title'>
              <h3>Friends Forever</h3>
              <p>We are unbeatable</p>
            </div>
          </div>
          <div className='group-btn-cont'>
            <button>Join</button>
          </div>
        </div>
        <div className='group_menu'>
          <div className='group_info'>
            <div className='group_profile_pic'>
              <img src={Group1Pic}/>
            </div>
            <div className='group_title'>
              <h3>Friends Forever</h3>
              <p>We are unbeatable</p>
            </div>
          </div>
          <div className='group-btn-cont'>
            <button>Join</button>
          </div>
        </div>
        <div className='group_menu'>
          <div className='group_info'>
            <div className='group_profile_pic'>
              <img src={Group1Pic}/>
            </div>
            <div className='group_title'>
              <h3>Friends Forever</h3>
              <p>We are unbeatable</p>
            </div>
          </div>
          <div className='group-btn-cont'>
            <button>Join</button>
          </div>
        </div>
        <div className='group_menu'>
          <div className='group_info'>
            <div className='group_profile_pic'>
              <img src={Group1Pic}/>
            </div>
            <div className='group_title'>
              <h3>Friends Forever</h3>
              <p>We are unbeatable</p>
            </div>
          </div>
          <div className='group-btn-cont'>
            <button>Join</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Group