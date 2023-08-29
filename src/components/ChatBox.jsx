import React from 'react'
import MessageProfileImage from '../assets/ChatProfile.png'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import chatImage from '../assets/loginimg.png'
import { BiLaugh } from 'react-icons/bi';
import { HiOutlineCamera } from 'react-icons/hi';
import { FaPaperPlane } from 'react-icons/fa';
import ModalImage from "react-modal-image";


const ChatBox = () => {
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
              <h2>Sourav Acherjee</h2>
              <p>Active</p>
            </div>
          </div>
          <div className='dotChatProfile'>
            <BiDotsVerticalRounded/>
          </div>
        </div>
        <div className='ConversationBox'>
          <div className='textItem1'>
            <p className='send_text1'>Hey There!cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc</p>
            <span>Today, 2.13pm</span>
          </div>
          <div className='textItem2'>
            <p className='send_text2'>How are you doing?</p>
            <span>Today, 2.13pm</span>
          </div>
          <div className='ImgItem1'>
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
            <video width="240" height="180" controls></video>
          </div>
          <div className='video2'>
            <video  width="240" height="180" controls></video>
          </div>
          <div  className='ImgItem2'>
            <ModalImage
                small={chatImage}
                large={chatImage}
            />
          </div>

          
          
        </div>

      </div>
      <div className='SendInputText'>
        <div className='emojiIconsList'>
          <input/>
          <BiLaugh className='emojiIcon1'/>
          <HiOutlineCamera className='emojiIcon2'/>
          <div className='planeIcon'>
            <FaPaperPlane className='emojiIcon3'/>
          </div>
        </div>


      </div>
    </div>
  )
}

export default ChatBox