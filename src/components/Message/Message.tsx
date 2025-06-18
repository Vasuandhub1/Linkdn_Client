import React,{useEffect,useRef,useState} from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Badge,
} from '@mui/material';
import {PremiumCard,AdCard,MessageItem,SidebarChat,MessageList,ChatArea,TabBar,Sidebar,Container,SidebarSearch,SidebarHeader,RightSection, SidebarOuter, ChatHeader,ChatBody} from "./MessageStyles"
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import Chatarea from './Chatarea';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { NavigationAvatar } from '../component';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"
import {Chip} from '@mui/material';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const Message= () => {
    const [Connections,SetConnections] = useState([])
    const {_id,profilePic,profiletag,name} = useSelector((state:RootState)=>state.auth)
    const [Selected,Setselected]=useState(null)
    const [input,Setinput] = useState("")
     const [search,Setsearch] = useState([])
     const ws = useRef(null)


     const connectWs = async()=>{
      const websocket = new WebSocket("ws://localhost:3000")
       
      websocket.onopen=()=>{
        console.log("hello open")
         websocket.onmessage=(event)=>{
          const data = JSON.parse(event.data)
        
          if(data.type === "RecivedMessage"){
            console.log(Connections,"con")
            let temp = [...Connections]
            console.log(temp,"temp")
            temp = temp.map((elem)=>{
              if(_id === data.data.recipient && data.data.sender === elem.Connections._id){
                  elem.unseen += 1
                  console.log(elem,"elem")
                  return elem
              }
              console.log(elem,"elem")
              return elem
            })
            if(temp.length>0){
              SetConnections(temp)
            }
          }
         }
         websocket.send(JSON.stringify({"type":"connection","name":name,"_id":_id}))
        console.log("Connected to the websocket server")}
        console.log(websocket.CONNECTING)
        ws.current=websocket
        
       
     }
     
const GetAllConnections = async()=>{
        try{
            const res= await axios.get(`${BASE_URL}/network/connections/${_id}`)
            let temp = [...res?.data?.data]
           
            SetConnections([...temp])
        }catch(err){
            console.log(err)
        }
    }

     const HandleInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
          console.log("hello")
          Setinput(e.target.value)
          if(e.target.value===""){
            Setsearch([])
            return
          }else{
            let temp = [...Connections]
            temp = temp.filter((elem)=>{
              // console.log(elem)
              
              if(elem.Connections.name.toLowerCase().includes(e.target.value.toLowerCase())){
                return true
              }else{
                return false
              }
            })
            Setsearch([...temp])
          }
        }
        
     useEffect(()=>{
            GetAllConnections()
        },[])

        useEffect(()=>{
           connectWs()
             return () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  };
        },[])

        
        
     console.log(Connections,"hello")

  return (
    <Container>
      <SidebarOuter>
        <SidebarHeader><Typography variant='h4'>Messaging</Typography> <SidebarSearch onChange={HandleInput} value={input} placeholder='Search'/></SidebarHeader>
        <Divider/>
        <SidebarHeader sx={{gap:"0.5rem"}}><Chip label="Label" color='success' variant='contained' sx={{padding:"1.1rem", fontSize:"1.3rem", fontWeight:"light"}}/> <Chip label="Unread" variant='outlined' color='success'   sx={{padding:"1.1rem", fontSize:"1.3rem", fontWeight:"light"}}/> <Chip label="Jobs" variant='outlined' color='success'   sx={{padding:"1.1rem", fontSize:"1.3rem", fontWeight:"light"}}/></SidebarHeader>
        <Divider/>
        <SidebarChat>
        <Sidebar>
          <MessageList>
            {input===""?Connections.map((elem)=>{
              return(
                 <MessageItem onClick={()=>(Setselected(elem))} selected={Selected && Selected.Connections._id==elem.Connections._id}>
              <NavigationAvatar
              src={elem.Connections.ProfileTag===''?elem.Connections.profilePic:elem.Connections.ProfileTag==="hiring"?hiring:elem.Connections.ProfileTag==="opentowork"?opentowork:elem.Connections.profilePic}
              coverImage={elem.Connections.profilePic}
              />
              
              <Box sx={{display:"flex" , flexDirection:"column", marginTop:"1rem", marginLeft:"1rem"}}>
              <Box>
                <Typography variant='h6'> {elem.Connections.name}</Typography>
              </Box>
              <Typography > {elem.Connections.email}</Typography>
              </Box>
              {elem?.unseen?<Badge badgeContent={elem?.unseen} color='success'></Badge>:null}
             
            </MessageItem>
              )
            }):search.map((elem)=>{
              return(
                 <MessageItem onClick={()=>(Setselected(elem))} selected={Selected && Selected.Connections._id==elem.Connections._id} >
              <NavigationAvatar
              src={elem.Connections.ProfileTag===''?elem.Connections.profilePic:elem.Connections.ProfileTag==="hiring"?hiring:elem.Connections.ProfileTag==="opentowork"?opentowork:elem.Connections.profilePic}
              coverImage={elem.Connections.profilePic}
              />
              
              <Box sx={{display:"flex" , flexDirection:"column", marginTop:"1rem", marginLeft:"1rem"}}>
              <Box>
                <Typography variant='h6'> {elem.Connections.name}</Typography>
              </Box>
              <Typography > {elem.Connections.email}</Typography>
              </Box>
             
            </MessageItem>
              )
            })}
          </MessageList>
        
        </Sidebar>
        {Selected?<Chatarea selected={Selected} ws={ws} />: <ChatArea>
          <ChatBody >
           <DotLottieReact
      src="https://lottie.host/023cb542-0bc1-4695-a530-6fd66cfb5eeb/FUaZMxIybk.lottie"
      loop
      autoplay
    />
    </ChatBody>
        
      </ChatArea>}

        </SidebarChat>
        
       
        
      </SidebarOuter>
      {Selected?<Chatarea selected={Selected} ws={ws}/>: <ChatArea>
         <DotLottieReact
      src="https://lottie.host/8c59c589-e395-4fbc-b281-ce8930441e10/7WXOXhjTTL.lottie"
      loop
      autoplay
    />
        
      </ChatArea>}

      <RightSection>
        <AdCard>
          <Box display="flex" alignItems="center">
            <Avatar src="https://logo.clearbit.com/licindia.in" sx={{ marginRight: '1rem' }} />
            <Box>
              <Typography fontWeight="bold">LIC Housing Finance LTD</Typography>
              <Typography variant="body2">Vasu, you might like to follow LIC Housing Finance LTD</Typography>
              <Button variant="outlined" size="small" sx={{ marginTop: '0.5rem' }}>Follow</Button>
            </Box>
          </Box>
        </AdCard>
        <PremiumCard>
          <Typography fontWeight="bold" variant="body1" mb={1}>Invest in Your Network</Typography>
          <Typography variant="body2">✅ Message anyone with InMail</Typography>
          <Typography variant="body2">📈 Get up to 11x more profile views</Typography>
          <Typography variant="body2">📚 Stay ahead with exclusive insights</Typography>
          <Typography variant="body2">🎙️ Access exclusive live talks with industry icons</Typography>
          <Button variant="contained" color="warning" fullWidth sx={{ marginTop: '1rem' }}>Try Premium for ₹0</Button>
        </PremiumCard>
      </RightSection>
    </Container>
  );
};

export default Message;
