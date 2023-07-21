
import React from 'react'
// import { BsThreeDotsVertical } from 'react-icons/bs'
import Group1Pic from '../assets/friend1.png'
import { getDatabase, ref, onValue, remove,set,push} from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
// import { BiDotsVerticalRounded } from 'react-icons/bi'



const Friends = () => {
  const db = getDatabase();
  let [friends,setFriends] = useState([])
  let userData = useSelector((state)=>state.loggedUser.loginUser)


  let handleUnfriend = (id)=>{
    remove(ref(db, 'friends/' + id))
    // console.log(id)
  }

  let handleBlock =(item)=>{
    // console.log(item)

    if(userData.uid == item.whosendid){
      set(push(ref(db, 'block/')), {
            blockedname: item.whoreceivename,
            blockedid: item.whoreceiveid,
            blockedbyname: item.whosendname,
            blockedbyid: item.whosendid,
        }).then(()=>{
          remove(ref(db, 'friends/' + item.id))
        })
    }else{
      set(push(ref(db, 'block/')), {
        blockedname: item.whosendname,
        blockedid: item.whosendid,
        blockedbyname: item.whoreceivename,
        blockedbyid: item.whoreceiveid,
      }).then(()=>{
        remove(ref(db, 'friends/' + item.id))
      })
    }
  }


  useEffect(()=>{ 
    const friendsref = ref(db, 'friends/');
    onValue(friendsref, (snapshot) => {
      // const data = snapshot.val();
      let arr =[]
      snapshot.forEach((item)=>{
        if(item.val().whosendid == userData.uid || item.val().whoreceiveid == userData.uid){

          arr.push({...item.val(),id:item.key})
          console.log(item.key)
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
              <div className='user-btn-cont'>
                        <button onClick={()=>handleUnfriend(item.id)}>Unfriend</button>
                        <button onClick={()=>handleBlock(item)} className='friend_request_btn'>Block</button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Friends