import React, { useState,useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import {ProfileAvatar,ProfileAvatarContainer,ProfileCard,SkillChip,SectionHeader,Section,Content,EditIconButton,CoverOverlay,Banner,ProfileWrapper,CoverButton} from "./ProfileComponentStyle"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import AlertDialougeSlide from './AlertDialougeSlide';





const LinkedInProfilePage = () => {

  const {name,email,profile,_id} = useSelector((state:RootState)=>state.auth)
 
  const [ProfileData,SetProfileData] = useState()
  

  const HandleGetData = async()=>{
    try{
      console.log(`${BASE_URL}/User/:${_id}`)
      const res = await axios.get(`${BASE_URL}/User/${_id}`,{withCredentials:true})
      console.log(res)
      SetProfileData({...res?.data?.data})
      
    }catch(err){
      console.log(err)
    }
  }
  const [open,SetOpen] = useState<boolean>(false)
  const [Purpose,SetPurpose] = useState<string>("")

  const HandleEdit = (purpose:string)=>{ 
    console.log(purpose)
    if(open){
      SetOpen(false)
    }else{
      if(purpose == "description"){
        SetPurpose(purpose)
      
      }
      if(purpose == "experience"){
        SetPurpose(purpose)
      }
      if(purpose == "skills"){
        SetPurpose(purpose)
      }
      if(purpose == "profile"){
        SetPurpose(purpose)
      }
      SetOpen(true)

    }
    
  }
  

useEffect(()=>{
    HandleGetData()
  },[])

useEffect(()=>{
    HandleGetData()
  },[open,_id])
  
  return (
    <ProfileWrapper>
      
      <ProfileCard>
        {/* Cover Section */}
        <AlertDialougeSlide open={open} setopen={SetOpen}  purpose={Purpose} data={ProfileData}/>
        <Banner coverImage={profile}>
          <CoverOverlay >
            <CoverButton startIcon={<CameraAltIcon />}>Edit Cover Photo</CoverButton>
          </CoverOverlay>
          {/* Profile Avatar with Edit */}
          <ProfileAvatarContainer onClick={()=>HandleEdit("profile")}>
            <ProfileAvatar  src={!profile?"https://via.placeholder.com/150":profile} alt="Vasu Singh" />
            {/* <EditIconButton size="large"  style={{ position: 'absolute', bottom: 0, right: -10 }}>
              <EditIcon fontSize="small" />
            </EditIconButton> */}
          </ProfileAvatarContainer>
        </Banner>

        {/* Profile Content */}
        <Content>
          {/* Basic Info */}
          <Section>
            <SectionHeader>
              <div>
                <Typography variant="h5">{name!}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {email!}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {ProfileData?.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Indore, Madhya Pradesh, India · 500+ connections
                </Typography>
              </div>
        
              <EditIconButton onClick={()=>HandleEdit("description")} name="description" size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <Box mt={2}>
              <Button variant="contained" color="primary" sx={{ mr: 1 }}>Message</Button>
              <Button variant="outlined" color="primary">Connect</Button>
            </Box>
          </Section>

          {/* Experience */}
          <Section>
            <SectionHeader>
              <Typography variant="h6">Experience</Typography>
              <EditIconButton onClick={()=>HandleEdit("experience")} size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            {ProfileData?.experience?.map((elem,index)=>{
              return (
                <>
                <Typography variant="body1">{elem.company}</Typography>
                <Typography variant="body2" color="textSecondary">{elem.start.substr(0,7)} - {elem.end.substr(0,7)}</Typography>
                </>
              )
            })}
          </Section>

          {/* Skills */}
          <Section>
            <SectionHeader>
              <Typography variant="h6">Skills</Typography>
              <EditIconButton onClick={()=>HandleEdit("skills")} size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            {!ProfileData?<SkillChip>Add some skills to showcase</SkillChip>:ProfileData?.skills?.map((elem:string,index:number)=>{
              return (
                <SkillChip key={index}>{elem}</SkillChip>
              )
            })}
          </Section>

          {/* Education */}
          <Section>
            <SectionHeader>
              <Typography variant="h6">Education</Typography>
              <EditIconButton size="small">
                <EditIcon fontSize="small" />
              </EditIconButton>
            </SectionHeader>
            <Typography variant="body1">Bachelor of Technology (B.Tech)</Typography>
            <Typography variant="body2" color="textSecondary">XYZ University, 2020 - 2024</Typography>
          </Section>
        </Content>
      </ProfileCard>
    </ProfileWrapper>
  );
};

export default LinkedInProfilePage;
