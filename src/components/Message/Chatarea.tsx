import React, { useEffect, useState } from 'react'
import {ChatArea,ChatFooter,ChatHeader,ChatBody,}from "./MessageStyles"
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { NavigationAvatar } from '../component';
import { useSelector } from 'react-redux';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"
import axios from "axios"
import { BASE_URL } from '../../Baseurl';
import InputEmoji from 'react-input-emoji'


function Chatarea({selected,ws}) {
  const [input,SetInput]=useState("")
  const [chat,SetChat]=useState([])
  
    const {_id,profile,profiletag,name} = useSelector((state:RootState)=>state.auth)

 const HandleSendMessage = () => {
  if (!ws?.current || ws.current.readyState !== WebSocket.OPEN) {
    console.error("WebSocket not connected");
    return;
  }
  ws.current.send(JSON.stringify({
    type: "SendMessage",
    to_id: selected.Connections._id,
    from_id:_id,
    data: input,
  }));
  SetInput("")
  console.log("Message sent successfully");
};


const getAllMessages = async()=>{
  try{
    const res = await axios.get(`${BASE_URL}/message/${_id}/${selected.Connections._id}`)
    
    SetChat([...res.data.data])
    MarkMessageAsSeen([...res.data.data])
    
  }catch(err){
    console.log(err)
  }
}

const MarkMessageAsSeen = (chats)=>{
  try{
    if (!ws?.current || ws.current.readyState !== WebSocket.OPEN) {
    console.error("WebSocket not connected");
    return;
  }
  console.log(chats,"chat")
  const temp  = chats.filter((elem)=>{
    if(elem.seen == false){
      return true
    }else{
      return false
    }
  })
  console.log(temp,"temp")
    ws.current.send(JSON.stringify({
      type:"seen",
      messages:[...temp],
      UserId:_id
    }))
    console.log(temp)
  }catch(err){
    console.log(err)
  }
}


useEffect(() => {
  const socket = ws?.current;
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.type === "RecivedMessage") {
      const isCurrentChat =
        (data.data.recipient === _id && data.data.sender === selected.Connections._id) ||
        (data.data.sender === _id && data.data.recipient === selected.Connections._id);
      if (isCurrentChat) {
        SetChat((prevChat) => [...prevChat, data.data]);
         ws.current.send(JSON.stringify({
      type:"seen",
      messages:[data.data],
      UserId:_id
    }))

      } else {
        console.log("Message for another chat");
      }
    }
  };

  socket.addEventListener("message", handleMessage);
  return () => socket.removeEventListener("message", handleMessage);
}, [ws?.current, selected.Connections._id, _id]);


        useEffect(()=>{
          getAllMessages()
        },[])


      console.log(chat)
  return (
       <ChatArea>
        <ChatHeader>
          <Box display="flex" alignItems="center">
            <NavigationAvatar
                         sx={{ width: 60, height: 60 ,marginRight: '0.75rem' }}
                                        coverImage={selected.Connections.profilePic}
                                        src={selected.Connections.ProfileTag===''?selected.Connections.profilePic:selected.Connections.ProfileTag==="hiring"?hiring:selected.Connections.ProfileTag==="opentowork"?opentowork:selected.Connections.profilePic}
                        />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{selected.Connections.name}</Typography>
              <Typography variant="caption" color="gray">
                {selected.Connections.description}
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </ChatHeader>
        <ChatBody>
          {chat? chat.map((elem,index)=>{
            if(index === 0){
              if(elem.sender === selected.Connections._id){
              return(
                <>
                <Divider>{new Date(elem.createdAt).toDateString()}</Divider>
                <Box mb={2} sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                  <NavigationAvatar
                         sx={{ width: 50, height: 50 ,marginRight: '0.5rem' }}
                                        coverImage={selected.Connections.profilePic}
                                        src={selected.Connections.ProfileTag===''?selected.Connections.profilePic:selected.Connections.ProfileTag==="hiring"?hiring:selected.Connections.ProfileTag==="opentowork"?opentowork:selected.Connections.profilePic}
                        />
                  <Box>
                  <Typography variant='body1' sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                    <strong style={{paddingRight:"0.4rem"}}>{selected.Connections.name } : </strong> {new Date(elem.createdAt).toLocaleTimeString().split(" ")[0].toString().substr(0,5)} {new Date(elem.createdAt).toLocaleTimeString().substring(8).toUpperCase()}</Typography>
            <Typography variant="body2">{elem.message} </Typography>
            </Box>
          </Box>
          </>
              )
            }else{
              return(
                <>
                <Divider>{new Date(elem.createdAt).toDateString()}</Divider>
                <Box mb={2} sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                  <NavigationAvatar
                         sx={{ width: 56, height: 56 ,marginRight: '0.5rem' }}
                                        coverImage={profile}
                                        src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
                        />
                  <Box>
                  <Typography variant='body1' sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                    <strong style={{paddingRight:"0.4rem"}}>{name}:</strong>{new Date(elem.createdAt).toLocaleTimeString().split(" ")[0].toString().substr(0,5)} {new Date(elem.createdAt).toLocaleTimeString().substring(8).toUpperCase()} </Typography>
            <Typography variant="body2">{elem.message} </Typography>
            </Box>
          </Box>
          </>
              )
            }
            }
            if(elem.sender === selected.Connections._id){
              return(
              <>
              { new Date(new Date(elem.createdAt).toDateString()) > new Date(new Date(chat[index-1].createdAt).toDateString())? <Divider>{new Date(elem.createdAt).toDateString()}</Divider> :null }
                <Box mb={2} sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                  <NavigationAvatar
                         sx={{ width: 50, height: 50 ,marginRight: '0.5rem' }}
                                        coverImage={selected.Connections.profilePic}
                                        src={selected.Connections.ProfileTag===''?selected.Connections.profilePic:selected.Connections.ProfileTag==="hiring"?hiring:selected.Connections.ProfileTag==="opentowork"?opentowork:selected.Connections.profilePic}
                        />
                  <Box>
                  <Typography variant='body1' sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                    <strong style={{paddingRight:"0.4rem"}}>{selected.Connections.name } : </strong> {new Date(elem.createdAt).toLocaleTimeString().split(" ")[0].toString().substr(0,5)} {new Date(elem.createdAt).toLocaleTimeString().substring(8).toUpperCase()}</Typography>
            <Typography variant="body2">{elem.message} </Typography>
            </Box>
          </Box>
          </>
              )
            }else{
              return(
                <>
                { new Date(new Date(elem.createdAt).toDateString()) > new Date(new Date(chat[index-1].createdAt).toDateString())? <Divider>{new Date(elem.createdAt).toDateString()}</Divider> :null }
                <Box mb={2} sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                  <NavigationAvatar
                         sx={{ width: 56, height: 56 ,marginRight: '0.5rem' }}
                                        coverImage={profile}
                                        src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
                        />
                  <Box>
                  <Typography variant='body1' sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
                    <strong style={{paddingRight:"0.4rem"}}>{name}:</strong>{new Date(elem.createdAt).toLocaleTimeString().split(" ")[0].toString().substr(0,5)} {new Date(elem.createdAt).toLocaleTimeString().substring(8).toUpperCase()} </Typography>
            <Typography variant="body2">{elem.message} </Typography>
            </Box>
          </Box>
          </>
              )
            }
          }):""}
        
        </ChatBody>
        <ChatFooter sx={{display:"flex", alignItems:"center"}}>
           <InputEmoji
          value={input}
          onChange={SetInput}
          cleanOnEnter
          onEnter={HandleSendMessage}
          placeholder="Type a message"
        />
         
          <Button onClick={HandleSendMessage}><SendIcon fontSize='large'/></Button>
        </ChatFooter>
      </ChatArea>
  )
}

export default Chatarea
