import React, { useState } from 'react'
import MessageProfileImage from '../assets/ChatProfile.png'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import chatImage from '../assets/loginimg.png'
import { BiLaugh } from 'react-icons/bi';
import { HiOutlineCamera } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import ModalImage from "react-modal-image";
import {useSelector} from 'react-redux'
import { getDatabase, ref, set,push,onValue} from "firebase/database";
import moment from 'moment/moment';
import { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getStorage, ref as imgref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}


const ChatBox = () => {
  const db = getDatabase();
  const storage = getStorage();
  let activeChat = useSelector((state)=>state.activeChat.activeChat)
  let userData = useSelector((state)=>state.loggedUser.loginUser)
  let [msg,setMsg] = useState("")
  let [singlemsglist,setSingleMsgList] = useState([])
  let [groupmsglist, setGroupmsglist] = useState([]);
  let [progsize, setProgSize] = useState(0);

  

  useEffect(()=>{
    const singleMsgRef = ref(db, 'singlemsg/');
    onValue(singleMsgRef, (snapshot) => {
      let arr =[]
      snapshot.forEach((item)=>{
        
        if((item.val().whosendid== userData.uid && item.val().whoreceiveid== activeChat.id) || (item.val().whosendid== activeChat.id && item.val().whoreceiveid== userData.uid)){
          arr.push({...item.val(),singlemsgid:item.key})
        }
      })
      setSingleMsgList(arr)
    });
  },[])

  useEffect(() => {
    const msgtRef = ref(db, "groupmsg");
    onValue(msgtRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupmsglist(arr);
    });
  }, [activeChat.id]);

  let handleSentMessage = ()=>{

    if(activeChat.type=="groupmsg"){
      if(msg != ""){
        set(push(ref(db, 'groupmsg/')), {
          whosendname : userData.displayName,
          whosendid:userData.uid,
          whoreceivename:activeChat.name,
          whoreceiveid:activeChat.id,
          msg:msg,
          date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        })
      }
    
    }else{
      if(msg != ""){
        set(push(ref(db, 'singlemsg/')), {
          whosendname : userData.displayName,
          whosendid:userData.uid,
          whoreceivename:activeChat.name,
          whoreceiveid:activeChat.id,
          msg:msg,
          date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        })
      }
    }
  }

  let handleImageUpload = (e)=>{
    console.log(e.target.files[0])
    const storageimgRef = imgref(storage, `images/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageimgRef, e.target.files[0]);

    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgSize(progress)
      
    }, 
    (error) => {}, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProgSize(0);
        if(activeChat.type=="groupmsg"){
          set(push(ref(db, 'groupmsg/')), {
            whosendname : userData.displayName,
            whosendid:userData.uid,
            whoreceivename:activeChat.name,
            whoreceiveid:activeChat.id,
            img:downloadURL,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          })
        
        }else{
          set(push(ref(db, 'singlemsg/')), {
            whosendname : userData.displayName,
            whosendid:userData.uid,
            whoreceivename:activeChat.name,
            whoreceiveid:activeChat.id,
            img:downloadURL,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          })
        }
      });
    }
  );
  }

  return (
    <div className='chatBox'>
      <div className='messageBox'>
        <div className='MessageProfile' >
          <div className='profileInfo'>
            <div className='profileImg'>
              <img src={MessageProfileImage}/>
              <div></div>
            </div>
            <div className='ChatProfileText'>
              <h2>{activeChat.name}</h2>
              <p>Active</p>
            </div>
          </div>
          <div className='dotChatProfile'>
            <BiDotsVerticalRounded/>
          </div>
        </div>
        <div className='ConversationBox'>
          {
            activeChat.type == "singlemsg" ? 
              singlemsglist.map((item)=>(
                item.whosendid == userData.uid ? 
                  item.msg ? 
                    <div className='textItem2'>
                      <p className='send_text2'>{item.msg}</p>
                      <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                    </div>
                  
                  :
                  item.img ?
                    <div className='ImgItem2'>
                      <ModalImage className='chatImageFix'
                        small={item.img}
                        large={item.img}
                      />
                    </div> 
                  :
                  ""
                :
                item.msg ? 
                <div className='textItem1'>
                  <p className='send_text1'>{item.msg}</p>
                  <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                </div>
                :
                item.img ?
                <div  className='ImgItem1'>
                  <ModalImage className='chatImageFix'
                      small={item.img}
                      large={item.img}
                  />
                </div>
                :
                ""
                  
              ))
            :
            groupmsglist.map((item)=>(
              item.whosendid == userData.uid && item.whoreceiveid == activeChat.id ?

              <div className='textItem2'>
                <p className='send_text2'>{item.msg}</p>
                <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
              </div>  
              :
              item.whoreceiveid == activeChat.id &&
              <div className='textItem1'>
                <p className='send_text1'>{item.msg}</p>
                <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
              </div>

            ))

          }


          {/* <div className='ImgItem1'>
            <ModalImage className='chatImageFix'
              small={chatImage}
              large={chatImage}
            />
          </div>
          <div  className='ImgItem2'>
            <ModalImage
                small={chatImage}
                large={chatImage}
            />
          </div>
          <div className='audio1'>
            <audio controls></audio>
          </div>
          <div className='audio2'>
            <audio controls></audio>
          </div>
          <div className='video1'>
            <video width="270" height="160" controls></video>
          </div>
          <div className='video2'>
            <video  width="270" height="160" controls></video>
          </div>
          <div  className='ImgItem2'>
            <ModalImage
                small={chatImage}
                large={chatImage}
            />
          </div> */}

          
          
        </div>

      </div>
      <div className='SendInputText'>
        <div className='emojiIconsList'>
          <input onChange={(e)=>{setMsg(e.target.value)}}/>
          <BiLaugh className='emojiIcon1'/>
          <label>
            <HiOutlineCamera className='emojiIcon2'/>
            <input onChange={handleImageUpload}  type='file' hidden/>
            
          </label>
          <div onClick={handleSentMessage} className='planeIcon'>
            <FaPaperPlane className='emojiIcon3'/>
          </div>
        </div>
        {
          progsize != 0 && 
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progsize} />
          </Box>
        }

      </div>

    </div>
  )
}

export default ChatBox