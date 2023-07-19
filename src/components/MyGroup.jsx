import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/Bs'
import Group1Pic from '../assets/friend1.png'
const MyGroup = () => {
  return (
    <div className='friends_container'>
        <div className='heading'>
        <h3>My Group</h3>
        <BsThreeDotsVertical className='friend_dot_icon'/>
        </div>
        <div className='friend_menu_container'>
        <div className='friend_menu'>
            <div className='group_info'>
            <div className='friend_profile_pic'>
                <img src={Group1Pic}/>
            </div>
            <div className='friend_title'>
                <h3>Riya Acherjee</h3>
                <p>Hi...</p>
            </div>
            </div>
            <div className='friend-btn-cont'>
            <p>Today, 8:56pm</p>
            </div>
        </div>
        <div className='friend_menu'>
            <div className='group_info'>
            <div className='friend_profile_pic'>
                <img src={Group1Pic}/>
            </div>
            <div className='friend_title'>
                <h3>Riya Acherjee</h3>
                <p>Hi...</p>
            </div>
            </div>
            <div className='friend-btn-cont'>
            <p>Today, 8:56pm</p>
            </div>
        </div>
        <div className='friend_menu'>
            <div className='group_info'>
            <div className='friend_profile_pic'>
                <img src={Group1Pic}/>
            </div>
            <div className='friend_title'>
                <h3>Riya Acherjee</h3>
                <p>Hi...</p>
            </div>
            </div>
            <div className='friend-btn-cont'>
            <p>Today, 8:56pm</p>
            </div>
        </div>
        <div className='friend_menu'>
            <div className='group_info'>
            <div className='friend_profile_pic'>
                <img src={Group1Pic}/>
            </div>
            <div className='friend_title'>
                <h3>Riya Acherjee</h3>
                <p>Hi...</p>
            </div>
            </div>
            <div className='friend-btn-cont'>
            <p>Today, 8:56pm</p>
            </div>
        </div>
        <div className='friend_menu'>
            <div className='group_info'>
            <div className='friend_profile_pic'>
                <img src={Group1Pic}/>
            </div>
            <div className='friend_title'>
                <h3>Riya Acherjee</h3>
                <p>Hi...</p>
            </div>
            </div>
            <div className='friend-btn-cont'>
            <p>Today, 8:56pm</p>
            </div>
        </div>
        <div className='friend_menu'>
            <div className='group_info'>
            <div className='friend_profile_pic'>
                <img src={Group1Pic}/>
            </div>
            <div className='friend_title'>
                <h3>Riya Acherjee</h3>
                <p>Hi...</p>
            </div>
            </div>
            <div className='friend-btn-cont'>
            <p>Today, 8:56pm</p>
            </div>
        </div>



        </div>
    </div>
  )
}

export default MyGroup