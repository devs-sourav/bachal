import React from 'react'
// import { BsThreeDotsVertical } from 'react-icons/bs'
import Group1Pic from '../assets/friend1.png'
import { getDatabase, ref, onValue, remove,set,push } from "firebase/database";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const FriendRequest = () => {
    const db = getDatabase();
    let userData = useSelector((state)=>state.loggedUser.loginUser)

    let [friendRequest, setFriendRequest] = useState([])
    // let [length, setLength] = useState([])
    useEffect(()=>{
        const friendRrequestRef = ref(db, 'friendRequest');
        onValue(friendRrequestRef, (snapshot) => {
            // const data = snapshot.val();
            let arr = []
            snapshot.forEach((item)=>{
                if(item.val().whoreceiveid == userData.uid){

                    arr.push({...item.val(),id:item.key})
                }
            })
            setFriendRequest(arr)
            // setLength(friendRequest.length)
            // console.log(length)
        });
    },[])

    let handleCancel = (id)=>{
        remove(ref(db, 'friendRequest/' + id))
    }

    let handleAccept = (item)=>{
        set(push(ref(db, 'friends/')), {
            ...item,

        }).then(()=>{
            remove(ref(db, 'friendRequest/' + item.id))
        })
    }

  return (
    <div className='friends_container'>
        <div className='heading'>
        <h3>Friend Request</h3>
        {/* <BsThreeDotsVertical className='friend_dot_icon'/> */}
        </div>
        <div className='friend_menu_container'>
            {    
                friendRequest.length == 0
                ?
                    <h4 className='empty_request'>Empty Friend Request</h4>
                :

                friendRequest.map((item)=>(
                    <div className='friend_menu'>
                    <div className='group_info'>
                    <div className='friend_profile_pic'>
                        <img src={Group1Pic}/>
                    </div>
                    <div className='friend_title '>
                        <h3>{item.whosendname}</h3>
                        <p>Today, 2:31pm</p>
                    </div>
                    </div>
                    <div className='user-btn-cont'>
                        <button onClick={()=>handleAccept(item)}>Confirm</button>
                        <button className='friend_request_btn' onClick={()=>handleCancel(item.id)}>Cancel</button>
                    </div>
                    </div>
                ))
            }

        </div>
    </div>
  )
}

export default FriendRequest