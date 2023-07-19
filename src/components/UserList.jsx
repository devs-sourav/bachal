import React from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
// import Group1Pic from '../assets/user1.png'
import { getDatabase, ref, onValue,set ,push ,remove} from "firebase/database";
import { useEffect,useState } from 'react';
import { getAuth } from 'firebase/auth';

const UserList = () => {

    const db = getDatabase();
    const auth = getAuth()
    let [userList,setUserList]= useState([])
    let [friendRequest,setFriendRequest]= useState([])

    useEffect(()=>{
        const usersRef = ref(db, 'friendRequest/');
        onValue(usersRef, (snapshot) => {
        // const data = snapshot.val();
            let arr = []
            snapshot.forEach(item=>{
                // console.log(item.val())
                arr.push(item.val().whoreceiveid+item.val().whosendid)
            })

            setFriendRequest(arr)
        });
    },[])

    useEffect(()=>{
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
        // const data = snapshot.val();
            let arr = []
            snapshot.forEach(item=>{
                arr.push({...item.val(),id:item.key})
            })

            setUserList(arr)
        });
    },[])


    let handleFriendRequest = (item)=>{
        // console.log("Kake Pathaise",item.id)
        // console.log("k pathaise", auth.currentUser.uid)
        set(push(ref(db, 'friendRequest/' )), {
            whosendid: auth.currentUser.uid,
            whosendname: auth.currentUser.displayName,
            whoreceiveid: item.id,
            whoreceivename: item.username,
        });
        
    }
    let handleCancel =(item)=>{
        remove(ref(db, 'friendRequest/' ))
    }



  return (
    <div className='friends_container'>
        <div className='heading'>
        <h3>User List</h3>
        <BiDotsVerticalRounded className='friend_dot_icon'/>
        </div>
        <div className='friend_menu_container'>
            {
                userList.map(item=>(
                    <div className='friend_menu'>
                    <div className='group_info'>
                    <div className='friend_profile_pic'>
                        <img src={item.profile_picture}/>
                    </div>
                    <div className='friend_title'>
                        <h3>{item.username}</h3>
                        <p>{item.email}</p>
                    </div>
                    </div>
                    <div className='user-btn-cont'>
                        {
                            friendRequest.includes(item.id+auth.currentUser.uid)
                            ?
                            <button onClick={()=>{handleCancel(item)}}>Cancel</button>
                            :

                            <button onClick={()=>{handleFriendRequest(item)}}>+</button>
                        }
                    </div>
                </div>
                ))
            }

        </div>
  </div>
  )
}

export default UserList