
import React from 'react'
// import { BsThreeDotsVertical } from 'react-icons/bs'
import Group1Pic from '../assets/friend1.png'
import { getDatabase, ref, onValue} from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import { BiDotsVerticalRounded } from 'react-icons/bi'


const Friends = () => {
  const db = getDatabase();
  let [friends,setFriends] = useState([])
  let userData = useSelector((state)=>state.loggedUser.loginUser)


  useEffect(()=>{ 
    const friendsref = ref(db, 'friends/');
    onValue(friendsref, (snapshot) => {
      // const data = snapshot.val();
      let arr =[]
      snapshot.forEach((item)=>{
        if(item.val().whosendid == userData.uid || item.val().whoreceiveid == userData.uid){

          arr.push({...item.val(),id:item.key})
        }
      })

      setFriends(arr)
      console.log(friends)

    });
 },[])
 console.log(userData)
// remove,set,push 

  return (
    <div className='friends_container'>
      <div className='heading'>
        <h3>Friends</h3>
        {/* <BsThreeDotsVertical className='friend_dot_icon'/> */}
      </div>
      <div className='friend_menu_container'>
        {
          friends.map((item)=>(
            <div className='friend_menu'>
              <div className='group_info'>
                <div className='friend_profile_pic'>
                  <img src={Group1Pic}/>
                </div>


                  <div className='friend_title'>
                    {
                        item.whoreceiveid == userData.uid 
                        ?
                        <h3>{item.whosendname}</h3>
                        :
                        <h3>{item.whoreceivename}</h3>
                                        
                    }

                    <p>Hello...</p>
                  </div>

              </div>
              <div className='friend-btn-cont'>
                <p>Today, 8:56pm</p>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Friends