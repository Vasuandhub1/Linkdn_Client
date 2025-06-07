import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, Grid,CardContent,Card, IconButton, Divider, Chip } from '@mui/material';
import {HomeWrapper,OptionButton,CreatePostOptions,FeedSection,Sidebar,PostHeader,PostActions,SuggestedUser,LeftSidebar} from "./DashboardComponentStyle"
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
// import ShareIcon from '@mui/icons-material/Share';
// import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import WorkIcon from '@mui/icons-material/Work';
import ArticleIcon from '@mui/icons-material/Article';
import CreatePost from './CreatePost';
import { useSelector } from 'react-redux';
// import auth from "../../Redux/slices/authSlice"
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
// import {ImagePreview} from "./DashboardComponentStyle"
// import Slider from "react-slick";
// import ImageCarousel from './ImageCarousel';
import Postcard from './PostCard';
import Repostcard from './RepostCard';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"
import {NavigationAvatar} from "../component"
function Dashboard() {
  

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

  const [TogglePost,SetTogglePost] = useState<boolean>(false)
  const {name,profile,profiletag} = useSelector((state:RootState)=>state.auth)
  const [Posts,SetPosts] = useState([])
  const [Repost,SetRepost] = useState([])
  // function 
  const HandleTogglePost = async()=>{
    if(TogglePost){
      SetTogglePost(false)
    }else{
      SetTogglePost(true)
    }
  }

  const GetPosts= async()=>{

    try{
    const res = await axios.get(`${BASE_URL}/post/all`,{withCredentials:true})
    SetPosts(res?.data?.data)
    }catch(err){
      console.log(err)
    }
  }

  const GetReposts= async()=>{
    try{
    const res = await axios.get(`${BASE_URL}/post/repost/all`,{withCredentials:true})
    console.log(res?.data?.data.post,"reposts")
    SetRepost(res?.data?.data?.post)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    GetPosts()
    GetReposts()
  },[])
  useEffect(()=>{
    GetPosts()
    GetReposts()
  },[TogglePost])
  

  return (
         <HomeWrapper>
          
      <LeftSidebar>
        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Your Shortcuts</Typography>
          <Typography variant="body2" mb={1}>#reactjs</Typography>
          <Typography variant="body2" mb={1}>#developer-life</Typography>
          <Typography variant="body2">#job-updates</Typography>
        </Card>

        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Groups</Typography>
          <Typography variant="body2" mb={1}>Full Stack Devs</Typography>
          <Typography variant="body2">LinkedIn Coders</Typography>
        </Card>
      </LeftSidebar>

      <FeedSection>
        <CreatePost open={TogglePost} setopen={SetTogglePost} />
        <Card style={{ marginBottom:'1rem',borderRadius:"1rem" }}>
          <Box display="flex" gap={2} padding={2} alignItems="center" mb={1}>
            <NavigationAvatar
            coverImage={profile}
            src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
            />
            <Button
              variant="outlined"
              fullWidth
              onClick={HandleTogglePost}
              sx={{ borderRadius: '20px', justifyContent: 'flex-start', color: '#666' }}
            >
              Start a post
            </Button>
          </Box>
          <CreatePostOptions>
            <OptionButton startIcon={<PhotoIcon />} size='large' color='success'>Photo</OptionButton>
            <OptionButton startIcon={<VideoCallIcon />} size='large' color='error'>Video</OptionButton>
            <OptionButton startIcon={<WorkIcon />} size='large' color='secondary'>Job</OptionButton>
            <OptionButton startIcon={<ArticleIcon />} size='large' color='warning'>Write Article</OptionButton>
          </CreatePostOptions>
          
        </Card>

        <Divider sx={{marginBottom:"1rem"}}><Chip label="Sort Feed "/></Divider>

        {Posts.map((post) => (
          <Postcard post={post}/>
        ))}
        {Repost.map((post)=>{
          return(
            <Repostcard post={post}/>
          )
        })}
        
      </FeedSection>

      <Sidebar>
        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Suggested for you</Typography>
          <SuggestedUser>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src="https://randomuser.me/api/portraits/women/65.jpg" />
              <Typography variant="body2">Anjali Arora</Typography>
            </Box>
            <Button size="small" variant="outlined">Connect</Button>
          </SuggestedUser>
          <SuggestedUser>
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar src="https://randomuser.me/api/portraits/men/22.jpg" />
              <Typography variant="body2">Dhruv Rathee</Typography>
            </Box>
            <Button size="small" variant="outlined">Connect</Button>
          </SuggestedUser>
        </Card>

        <Card style={{padding:"1rem", borderRadius:"1rem"}}>
          <Typography variant="h6" mb={2}>Trending News</Typography>
          <Typography variant="body2" gutterBottom>India’s tech hiring sees a 20% rise in Q2 2025.</Typography>
          <Typography variant="body2" gutterBottom>React 19 beta released with server actions support.</Typography>
          <Typography variant="body2">Startup ecosystem in Indore gains national traction.</Typography>
        </Card>
      </Sidebar>
    </HomeWrapper>
  )
}

export default Dashboard
