
import React from 'react'
import Group1Pic from '../assets/friend1.png'
import { getDatabase, ref, onValue, remove,set,push} from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { activeChat } from '../slices/activeChat/ActiveChatSlice';
// import { BiDotsVerticalRounded } from 'react-icons/bi'



const Friends = ({type}) => {
  const db = getDatabase();
  let [friends,setFriends] = useState([])
  let dispatch = useDispatch()
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
        }
      })

      setFriends(arr)
      if(arr[0].whosendid == userData.uid){

        dispatch(activeChat(
          {
            type: "singlemsg",
            name : arr[0].whoreceivename,
            id: arr[0].whoreceiveid
          }
        ))

        localStorage.setItem(
          "activeChat",
          JSON.stringify({
            type: "singlemsg",
            name : arr[0].whoreceivename,
            id: arr[0].whoreceiveid
          })
        );
      }else{

        dispatch(activeChat(
          {
            type: "singlemsg",
            name : arr[0].whosendname,
            id: arr[0].whosendid
          }
        ))

        localStorage.setItem(
          "activeChat",
          JSON.stringify({
            type: "singlemsg",
            name : arr[0].whosendname,
            id: arr[0].whosendid
          })
        );
      }

    });
 },[])
 console.log(userData)

let handleMsg =(item)=>{
  if(item.whosendid == userData.uid){
    dispatch(activeChat(
      {
        type: "singlemsg",
        name : item.whoreceivename,
        id: item.whoreceiveid
      }
    ))
    
    localStorage.setItem(
      "activeChat",
      JSON.stringify({
        type: "singlemsg",
        name : item.whoreceivename,
        id: item.whoreceiveid
      })
    );
  }else{
    dispatch(activeChat(
      {
        type: "singlemsg",
        name : item.whosendname,
        id: item.whosendid
      }
    ))
    localStorage.setItem(
      "activeChat",
      JSON.stringify({
        type: "singlemsg",
        name : item.whosendname,
        id: item.whosendid
      })
    );
  }
}

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
              {
                type == "msg" 
                ?
                <div className='user-btn-cont'>
                  <button className='unfrndbtndes' onClick={()=>handleMsg(item)}>Chat</button>
                </div>
                :
                <div className='user-btn-cont'>
                  <button className='unfrndbtndes' onClick={()=>handleUnfriend(item.id)}>Unfriend</button>
                  <button onClick={()=>handleBlock(item)} className='friend_request_btn blockbtndes'>Block</button>
                </div>
              }

            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Friends