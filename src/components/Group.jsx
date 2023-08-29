import React from 'react'
import { useEffect, useState } from 'react';
import Group1Pic from '../assets/group_1.png'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import LoadingButton from '@mui/lab/LoadingButton';
import {useSelector} from 'react-redux'
import { getDatabase, ref, set,push,onValue,remove } from "firebase/database";
import { ListItemSecondaryAction } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let groupData = {
  groupName : "",
  groupTagline: "",
}

const Group = () => {

  const db = getDatabase();
  let userData = useSelector((state)=>state.loggedUser.loginUser)
  let [groupInfo,setGroupInfo] = useState(groupData)
  let [group,setGroup] = useState([])
  let [member,setMember] = useState([])
  let [groupMember,setGroupMember] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=>{ 
    const groupref = ref(db, 'groups/');
    onValue(groupref, (snapshot) => {
      // const data = snapshot.val();
      let arr =[]
      snapshot.forEach((item)=>{
        if(item.val().adminId != userData.uid){
          arr.push({...item.val(),groupId:item.key})
        }
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
        if(item.val().adminId != userData.uid){
          arr.push(item.val().groupId)
        }
      })

      setMember(arr)
    });
    console.log(member)
  },[])

  useEffect(()=>{ 
    const grouprequestref = ref(db, 'grouprequest/');
    onValue(grouprequestref, (snapshot) => {
      // const data = snapshot.val();
      let arr =[]
      snapshot.forEach((item)=>{
        if(item.val().userId == userData.uid){

          arr.push(item.val().groupId)
        }
      })

      setGroupMember(arr)
    });
  },[])

  let handleChange =(e)=>{
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    })
  }

  let handleCreate =()=>{ 
    set(push(ref(db, 'groups/')), {
      groupName: groupInfo.groupName,
      groupTagLine: groupInfo.groupTagLine,
      adminId: userData.uid,
      adminName: userData.displayName,
    }).then(()=>{

      setOpen(false)
    })

  }

  let handleJoin = (item) =>{
    set(push(ref(db, 'grouprequest/')), {
      groupName: item.groupName,
      groupId:item.groupId,
      adminId: item.adminId,
      adminName: item.adminName,
      userId: userData.uid,
      userName: userData.displayName,
    })
  }

  // let handleCancel = (item)=>{
  //   remove(ref(db, 'grouprequest/' + item.groupId))
  //   console.log(item)
  // }

  let handleCancelGroupRequest = (g)=>{
    const groupRef = ref(db, "grouprequest");
    let gid = "";
    onValue(groupRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (
          item.val().userid == userData.uid &&
          g.groupid == item.val().groupid
        ) {
          gid = item.key;
        }
      });
    });
    remove(ref(db, "grouprequest/" + gid));
  }



  return (
    <div className='group_container'>
      <div className='heading'>
        <h3>Groups List</h3>
        <button onClick={handleOpen}>Create Group</button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Your Group
            </Typography>
            <Typography className='modalbox' id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField onChange={handleChange} name='groupName' margin='dense' id="outlined-basic" label="Group Name" variant="outlined" />
              <TextField onChange={handleChange} name='groupTagLine' margin='dense' id="outlined-basic" label="Group Tagline" variant="outlined" />
              <Button onClick={handleCreate} margin='dense' variant="contained">Create</Button>
              {/* <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined" > */}
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className='group_menu_container'>
        {

          group.length == 0
          ?
              <h4 className='empty_request'>Empty Group List</h4>
          :  
          group.map((item)=>(
            <div className='group_menu'>
              <div className='group_info'>
                <div className='group_profile_pic'>
                  <img src={Group1Pic}/>
                </div>
                <div className='group_title'>
                  <h3>{item.groupName}</h3>
                  <p>{item.groupTagLine}</p>
                </div>
              </div>
              <div className='group-btn-cont'>
                {

                  member.includes(item.groupId)

                  ?
                  <h4 className='reqpending'>Joined</h4>
                  :

                  groupMember.indexOf(item.groupId) != -1 
                  ?

                  <div className='groupbatch'>
                    <h4 className='reqpending'>Pending</h4>
                    <button onClick={()=>handleCancelGroupRequest(item)} className='redbtnCancel'>Cancel</button>
                    {/* <button className='cancelGroupReq' onClick={()=>handleCancel(item)}>Cancel</button> */}
                  </div>
                  :
                  
                  <button onClick={()=>handleJoin(item)}>Join</button>
                  
                }
              </div>
            </div>
          ))
        }
        
      </div>
    </div>
  )
}

export default Group