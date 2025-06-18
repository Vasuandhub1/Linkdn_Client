import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, Button, IconButton, TextField, Divider, MenuItem, Paper
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from 'styled-components';
import { BASE_URL } from '../../Baseurl';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import axios from 'axios';
import { NavigationAvatar } from '../component';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"  

// Styled Components
const Container = styled(Box)`
  padding: 2rem;
  background-color: #f4f2ee;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const LeftSection = styled(Box)`
  flex: 2;
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const RightSection = styled(Box)`
  flex: 1;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const SearchBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ConnectionList = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ConnectionCard = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  background: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
`;

const InfoSection = styled(Box)`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
`;

const MessageButton = styled(Button)`
  text-transform: none;
  border-radius: 2rem;
  font-weight: 600;
`;

const PremiumCard = styled(Paper)`
  padding: 2rem;
  text-align: center;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;


const Connections = () => {
    const [Connections,SetConnections] = useState([])
    const {_id,profile,profiletag,name}= useSelector((state:RootState)=>state.auth)
     const [input,Setinput] = useState("")
      const [search,Setsearch] = useState([])


    const GetAllConnections = async()=>{
        try{
            const res= await axios.get(`${BASE_URL}/network/connections/${_id}`)
            SetConnections(res?.data?.data)
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

    console.log(search,"Hello")

    useEffect(()=>{
        GetAllConnections()
    },[])

  return (
    <Container>
      <LeftSection>
        <Header>
          <Typography variant="h6" fontWeight={700}>
           {Connections.length} connections
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="body2" color="textSecondary">
              Sort by:
            </Typography>
            <TextField
              select
              variant="standard"
              defaultValue="recent"
              size="small"
             
            >
              
              <MenuItem value="recent">Recently added</MenuItem>
              <MenuItem value="name">Name</MenuItem>
            </TextField>
          </Box>
        </Header>

        <SearchBox>
          <TextField
            placeholder="Search by name"
            size="small"
            variant="outlined"
            sx={{ width: '300px' }}
            onChange={HandleInput}
             value={input}
          />
          <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
            Search with filters
          </Typography>
        </SearchBox>

        <ConnectionList>
          {search.length === 0?Connections.map((user, index) => (
            <ConnectionCard key={index}>
              <InfoSection>
                <NavigationAvatar
                sx={{ width: 56, height: 56 }}
                coverImage={user.Connections.profilePic}
                src={user.Connections.ProfileTag===''?user.Connections.profilePic:user.Connections.ProfileTag==="hiring"?hiring:user.Connections.ProfileTag==="opentowork"?opentowork:user.Connections.profilePic}

                />
                
                <Box>
                  <Typography fontWeight={600}>{user.Connections.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.Connections.description}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    connected on Linkedin
                  </Typography>
                </Box>
              </InfoSection>

              <Box display="flex" alignItems="center" gap={1}>
                <MessageButton variant="outlined" color="primary">
                  Message
                </MessageButton>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </ConnectionCard>
          )):search.map((user, index) => (
            <ConnectionCard key={index}>
              <InfoSection>
                <NavigationAvatar
                sx={{ width: 56, height: 56 }}
                coverImage={user.Connections.profilePic}
                src={user.Connections.ProfileTag===''?user.Connections.profilePic:user.Connections.ProfileTag==="hiring"?hiring:user.Connections.ProfileTag==="opentowork"?opentowork:user.Connections.profilePic}

                />
                
                <Box>
                  <Typography fontWeight={600}>{user.Connections.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{user.Connections.description}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    connected on Linkedin
                  </Typography>
                </Box>
              </InfoSection>

              <Box display="flex" alignItems="center" gap={1}>
                <MessageButton variant="outlined" color="primary">
                  Message
                </MessageButton>
                <IconButton>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            </ConnectionCard>
          ))}
        </ConnectionList>
      </LeftSection>

      <RightSection>
        <PremiumCard elevation={1}>
          <Typography variant="caption" color="textSecondary">
            Premium subscribers are 2.6x more likely to get hired
          </Typography>
          <NavigationAvatar
            src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
            coverImage={profile}
            sx={{ width: 72, height: 72, margin: '1rem auto' }}
          />
          <Typography variant="body1" fontWeight={500}>
            {name}, boost your job search with Premium
          </Typography>
          <Button
            variant="outlined"
            sx={{ borderRadius: "2rem", mt: 2 }}
            color="primary"
          >
            Try for free
          </Button>
        </PremiumCard>
      </RightSection>
    </Container>
  );
};

export default Connections;
