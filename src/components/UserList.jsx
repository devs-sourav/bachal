import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import Group1Pic from '../assets/user1.png'

const UserList = () => {
  return (
    <div className='friends_container'>
        <div className='heading'>
        <h3>User List</h3>
        <BiDotsVerticalRounded className='friend_dot_icon'/>
        </div>
        <div className='friend_menu_container'>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title'>
                    <h3>Sourav</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                <button>+</button>
                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title'>
                    <h3>Sourav</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                <button>+</button>
                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title'>
                    <h3>Sourav</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                    <button>+</button>
                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title'>
                    <h3>Sourav</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                <button>+</button>
                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title'>
                    <h3>Sourav</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                <button>+</button>
                </div>
            </div>
        </div>
  </div>
  )
}

export default UserList