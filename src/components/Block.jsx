import React, { useEffect, useState } from 'react'
// import { BsThreeDotsVertical } from 'react-icons/bs'
import Group1Pic from '../assets/user1.png'
import { getDatabase, ref, onValue } from "firebase/database";
import {useSelector} from 'react-redux'


const Block = () => {
    const db = getDatabase();
    let userData = useSelector((state)=>state.loggedUser.loginUser)
    let [blocklist,setBlockList]=useState([])

    useEffect(()=>{
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
        //   const data = snapshot.val();
            let arr =[]
            snapshot.forEach((item)=>{
                arr.push({...item.val(),id:item.key})
            })
            setBlockList(arr)
            
        });
        
    },[])
    console.log(blocklist)

  return (
    <div className='friends_container'>
        <div className='heading'>
        <h3>Blocked Users</h3>
        {/* <BsThreeDotsVertical className='friend_dot_icon'/> */}
        </div>
        <div className='friend_menu_container'>
            {
                blocklist.map((item)=>(
                <div className='friend_menu'>
                    <div className='group_info'>
                        <div className='friend_profile_pic'>
                            <img src={Group1Pic}/>
                        </div>
                        <div className='friend_title'>
                            
                            {
                                item.blockbyid == userData.uid 
                                ?
                                <>
                                    <h3>{item.blockedbyname}</h3>
                                    <p>Today, 2:31pm</p>
                                </>
                                :
                                <>
                                    <h3>{item.blockedname}</h3>
                                    <p>Today, 2:31pm</p>
                                </>
                            }
                        </div>
                    </div>
                    <div className='user-btn-cont'>
                    <button>Unblock</button>
                    </div>
                </div>
                )) 
            }


        </div>
    </div>
  )
}

export default Block