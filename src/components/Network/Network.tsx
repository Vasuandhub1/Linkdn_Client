import React, { useState } from 'react';
import { Box, Button, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { NavigationAvatar } from '../component';
import { ProfileCard,Container,Sidebar,Main,ProfileSection,SectionTitle,ProfileInfo,SuperMain} from './Network.Style';
import { NavLink } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"
import { useSelector} from 'react-redux';
import type { RootState } from '../../Redux/store';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const NetworkPage = () => {

  const [users,Setusers]=useState([])
  const [invitations,Setinvitations]=useState([])
  const [connection,Setconnection]=useState()
 
  const navigate = useNavigate()


  const {_id,email} = useSelector((state:RootState)=>state.auth)

  

  const getInvitations = async()=>{
    try{
      const res= await axios.get(`${BASE_URL}/network/${_id}`,{withCredentials:true})
      console.log(res)
      Setinvitations([...res.data.data])
      
    }catch(err){
      console.log(err)
      return 
    }
  }

  const HandleInvitation = async(status:string,recepientId:string,index:number)=>{
    try{
        const res = await axios.put(`${BASE_URL}/network/${_id}/${recepientId}/${status}`)
        console.log(res)
        const temp = [...invitations]
        temp.splice(index,1)
        Setinvitations(temp)
    }catch(err){
      console.log(err)
    }
  }

  const Getuser = async()=>{
    try{
      const res = await axios.get(`${BASE_URL}/network/all/${10}/${0}/${_id}`,{withCredentials:true})
      console.log(res.data.data.connections,"get")
      Setconnection(res.data.data.connections || 0)
      Setusers([...res?.data?.data?.temp])
    }catch(err){
      console.log(err)
    }
  } 

  const SendRequest = async(Id,key)=>{
    try{
      const res  = await axios.post(`${BASE_URL}/network/${_id}`,{recepientId:Id},{withCredentials:true})
      const temp = [...users]
      temp[key].button="pending"
      Setusers([...temp])
      return
    }catch(err){
      console.log(err)
    }
  }
  useState(()=>{
    getInvitations()
    Getuser()
  },[])

  console.log(invitations,users)

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <SectionTitle variant="h6">Manage My Network</SectionTitle>
        <List>
          <ListItem button >
            <ListItemIcon><PeopleAltOutlinedIcon /></ListItemIcon>
            
            <ListItemText  onClick={()=>(navigate("/connections"))} primary={`Connections`} />
            <ListItemText primary={`${connection?connection:"loading..."}`} />
          </ListItem>
          <ListItem button>
            <ListItemIcon><GroupsOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><EventOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><BusinessCenterOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Followed Companies" />
          </ListItem>
        </List>
      </Sidebar>

      {/* Main */}
      <SuperMain>
      <Main>
        {/* Invitations Section */}
        <SectionTitle variant="h5" padding={"1rem"}>Invitations</SectionTitle>
        {invitations.map((person, idx) => (
          <ProfileSection key={idx}>
            <ProfileInfo>
               <NavigationAvatar 
             style={{width:"3rem", height:"3rem", border: '3px solid white',margin: '0 auto'}}
              coverImage={person.profilePic}
       src={person.users.ProfileTag===''?profile:person.users.ProfileTag==="hiring"?hiring:person.users.ProfileTag==="opentowork"?opentowork:person.users.ProfileTag}
     />
              
              <Box>
                <Typography variant="subtitle1">{person.users.name}</Typography>
                <Typography variant="caption" color="text.secondary">{person.users.description}</Typography>
              </Box>
            </ProfileInfo>
            <Box display="flex" gap={1}>
              <Button size="small" variant="contained" onClick={()=>{HandleInvitation("confirm",person.users._id,idx)}}>Accept</Button>
              <Button size="small" variant="outlined" onClick={()=>{HandleInvitation("rejected",person.users._id,idx)}}>Ignore</Button>
            </Box>
          </ProfileSection>
        ))}
        </Main>
<Main>
        {/* People You May Know Section */}
        <SectionTitle variant="h5" padding={"1rem"} >People You May Know</SectionTitle>
        <Box sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",       // 1 column on mobile
      sm: "1fr",       // 1 column on small screens
      md: "repeat(2, 1fr)",  // 2 columns on medium and up
      lg: "repeat(3, 1fr)",  // optional: 3 columns on large
    },
    gap: "1.5rem",
  }}>
        {users.length>0?users.map((person,index) => {

          if(person._doc._id === _id){
            return
          }

          return(
          <ProfileCard key={index} sx={{borderRadius:"1rem 1rem 1rem 1rem", width:"25rem"
          }}>
            
      {/* Background cover (mocked as solid for now) */}
      <Box height={90} borderRadius="1rem 1rem 0 0"  bgcolor="#cce0ff" />
      
      <NavLink to={"/profile"}>
     <Box sx={{display:"flex", justifyContent:"center"}} >
      
      <NavigationAvatar 
      style={{width:"8rem", height:"8rem", border: '3px solid white',margin: '0 auto',marginTop: '-36px'}}
     coverImage={person._doc.profilePic}
       src={person._doc.ProfileTag===''?person._doc.profilePic:person._doc.ProfileTag==="hiring"?hiring:person._doc.ProfileTag==="opentowork"?opentowork:person._doc.profilePic}
     />
     </Box>
     </NavLink>

      <Typography variant="h6" mt={1}>{person?._doc.name}</Typography>
      <Typography variant="body2" color="text.secondary">
       {person._doc.description}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Indore, Madhya Pradesh
      </Typography>

     <Box padding={"2rem"}>
       {
        person.button==="pending"?<Button variant='outlined' color='primary' sx={{width:"10rem",gap:"0.5rem"}} onClick={()=>SendRequest(person._doc._id,index)} > <AccessTimeOutlinedIcon/>{person.button}</Button>:<Button variant='contained' color='primary' sx={{width:"10rem",gap:"0.5rem"}} onClick={()=>SendRequest(person._doc._id,index)} > <AddCircleOutlineOutlinedIcon/>{person.button}</Button>
       }
     </Box>

    </ProfileCard>
        )}):<Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
           <DotLottieReact
      src="https://lottie.host/68c7d63e-8ad1-4180-9b4e-a2135c0bcc16/Lg4r3ytDHY.lottie"
      loop
      autoplay
      style={{width:"45rem"}}
    />
          </Box>}
        </Box>
      </Main>
      </SuperMain>
    </Container>
  );
};

export default NetworkPage;
