import React from 'react'
import Group1Pic from '../assets/group_1.png'
import { getDatabase, ref, onValue,set,push,remove} from "firebase/database";
import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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

const MyGroup = () => {
    const db = getDatabase();
    let [myGroup,setMyGroup] = useState([])
    let [myGroupReq,setMyGroupReq] = useState([])
    // let [flag,setFlag] = useState(0)
    let [groupInfo,setGroupInfo] = useState(groupData)
    const [open, setOpen] = useState(false);
    const [openreq, setOpenreq] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let userData = useSelector((state)=>state.loggedUser.loginUser)
    const handleOpenReq = (group) =>{

      setOpenreq(true);

        const myGroupreqref = ref(db, 'grouprequest');
        onValue(myGroupreqref, (snapshot) => {
          // const data = snapshot.val();
          let arr =[]
          snapshot.forEach((item)=>{
            // console.log(userData.uid == item.val().adminId)
            // console.log(item.val().groupId == group.groupsId)
            if(userData.uid == item.val().adminId && item.val().groupId == group.groupsId){
              console.log(userData.uid == item.val().adminId )
              arr.push({...item.val(),groupreqid:item.key})
            }
          })
    
          setMyGroupReq(arr)
    
        });

        
    } 
    const handleClosereq = () => setOpenreq(false);


    useEffect(()=>{ 
        const myGroupref = ref(db, 'groups/');
        onValue(myGroupref, (snapshot) => {
          // const data = snapshot.val();
          let arr =[]
          snapshot.forEach((item)=>{
            if(item.val().adminId == userData.uid){
    
              arr.push({...item.val(),groupsId:item.key})
              console.log(item.key)
            }
          })
    
          setMyGroup(arr)
          console.log(myGroup)
    
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

    let handleGroupDelete = (item)=>{
      console.log(item)
      remove(ref(db, 'grouprequest/' + item.groupreqid))
    }

    
  return (
    <div className='friends_container'>
        <div className='heading'>
            <h3>My Group</h3>
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
        <div className='friend_menu_container'>
            {
                myGroup.length == 0
                ?
                    <h4 className='empty_request'>Empty My Group List</h4>
                :  

                myGroup.map((item)=>(
                    <div className='friend_menu'>
                        <div className='group_info'>
                        <div className='friend_profile_pic'>
                            <img src={Group1Pic}/>
                        </div>
                        <div className='friend_title'>
                            <h3>{item.groupName}</h3>
                            <p>{item.groupTagLine}</p>
                        </div>
                        </div>
                        <div className='friend-btn-cont grpbtntab'>
                        <button onClick={()=>handleOpenReq(item)}>Request</button>
                        <Modal
                            open={openreq}
                            onClose={handleClosereq}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                  Group Request List
                                </Typography>
                                <Typography className='modalbox' id="modal-modal-description" sx={{ mt: 2 }}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                  {
                                    myGroupReq.map(item=>(
                                      <div>
                                        <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                          </ListItemAvatar>
                                          <ListItemText
                                            primary={item.userName}
                                            secondary={
                                              <React.Fragment>
                                                <Typography
                                                  sx={{ display: 'inline' }}
                                                  component="span"
                                                  variant="body2"
                                                  color="text.primary"
                                                >
                                                
                                                </Typography>
                                                {" — wants to join your group"}
                                                <div className='btnbox'>
                                                  <button>Accept</button>
                                                  <button onClick={()=>handleGroupDelete(item)}>Cancel</button>
                                                </div>
                                              </React.Fragment>
                                            }
                                          />
                                        </ListItem>
                                        
                                      </div>
                                    ))
                                  }

                                </List>
                                {/* <LoadingButton loading loadingPosition="start" startIcon={<SaveIcon />} variant="outlined" > */}
                                </Typography>
                            </Box>
                        </Modal>
                        <button className='memberbtn'>Member</button>
                        </div>
                    </div>

                ))
            }
        


        </div>
    </div>
  )
}

export default MyGroup