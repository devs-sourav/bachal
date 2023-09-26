import React from 'react'
import { useEffect, useState } from 'react';
import Group1Pic from '../assets/group_1.png'
import {useSelector , useDispatch } from 'react-redux'
import { getDatabase, ref, set,push,onValue,remove } from "firebase/database";
import { activeChat } from '../slices/activeChat/ActiveChatSlice';


const MsgGroup = () => {
    
const db = getDatabase();
let dispatch = useDispatch();

  let userData = useSelector((state)=>state.loggedUser.loginUser)
  let [group,setGroup] = useState([])
  let [member,setMember] = useState([])
//   console.log(userData)

  useEffect(()=>{ 
    const groupref = ref(db, 'groups/');
    onValue(groupref, (snapshot) => {
      // const data = snapshot.val();
      let arr =[]
      snapshot.forEach((item)=>{
        // if(item.val().adminId != userData.uid){
          arr.push({...item.val(),groupId:item.key})
        // }
      })

      setGroup(arr)
    });
  },[])
 

  useEffect(()=>{ 
    const memberref = ref(db, 'members/');
    onValue(memberref, (snapshot) => {
      // const data = snapshot.val();
      let arr =[]
      snapshot.forEach((item)=>{
        // if(item.val().adminId != userData.uid){
          arr.push(item.val())
        // }
      })

      setMember(arr)
    });
    console.log(member)
  },[])

  let handleOpen = (item)=>{
    console.log(item)
    dispatch(
        activeChat({
          type: "groupmsg",
          name: item.groupName,
          id: item.groupId,
        })
    );

    localStorage.setItem(
        "activeChat",
        JSON.stringify({
          type: "groupmsg",
          name: item.groupName,
          id: item.groupId,
        })
    );
  }


  return (
    <div className='group_container'>
      <div className='heading'>
        <h3>Message Group</h3>
      </div>
      <div className='group_menu_container'>
        {

          group.length == 0
          ?
              <h4 className='empty_request'>Empty Group List</h4>
          :  
          group.map((item)=>(
            userData.uid == item.adminId
            ?
            <div className='group_menu'>
              <div className='group_info'>
                <div className='group_profile_pic'>
                  <img src={Group1Pic}/>
                </div>
                <div className='group_title'>
                  <h3>{item.groupName}</h3>
                  <p>{item.adminName}</p>
                  <p>{item.groupTagLine}</p>
                </div>
              </div>
              <div className='group-btn-cont'>
                <button onClick={()=>(handleOpen(item))}>Admin</button>
              </div>
            </div>
            :
            (
            member.map(mem=>(
                userData.uid == mem.userId && item.groupId == mem.groupId && (
                <div className='group_menu'>
                    <div className='group_info'>
                    <div className='group_profile_pic'>
                        <img src={Group1Pic}/>
                    </div>
                    <div className='group_title'>
                        <h3>{mem.groupName}</h3>
                        <p>{mem.adminName}</p>
                        <p>{item.groupTagLine}</p>
                    </div>
                    </div>
                    <div className='group-btn-cont'>
                    <button onClick={()=>(handleOpen(item))}>Member</button>
                    </div>
                </div>
                )
            ))
            )
          ))
        }
        
      </div>
    </div>
  )
}

export default MsgGroup