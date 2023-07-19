import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/Bs'
import Group1Pic from '../assets/friend1.png'

const FriendRequest = () => {
  return (
    <div className='friends_container'>
        <div className='heading'>
        <h3>Friend Request</h3>
        <BsThreeDotsVertical className='friend_dot_icon'/>
        </div>
        <div className='friend_menu_container'>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title '>
                    <h3>Sourav Acharjee</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                    <button>Confirm</button>
                    <button className='friend_request_btn'>Cancel</button>

                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title '>
                    <h3>Sourav Acharjee</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                    <button>Confirm</button>
                    <button className='friend_request_btn'>Cancel</button>

                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title '>
                    <h3>Sourav Acharjee</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                    <button>Confirm</button>
                    <button className='friend_request_btn'>Cancel</button>

                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title '>
                    <h3>Sourav Acharjee</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                    <button>Confirm</button>
                    <button className='friend_request_btn'>Cancel</button>

                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title '>
                    <h3>Sourav Acharjee</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                    <button>Confirm</button>
                    <button className='friend_request_btn'>Cancel</button>

                </div>
            </div>
            <div className='friend_menu'>
                <div className='group_info'>
                <div className='friend_profile_pic'>
                    <img src={Group1Pic}/>
                </div>
                <div className='friend_title '>
                    <h3>Sourav Acharjee</h3>
                    <p>Today, 2:31pm</p>
                </div>
                </div>
                <div className='user-btn-cont'>
                    <button>Confirm</button>
                    <button className='friend_request_btn'>Cancel</button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default FriendRequest