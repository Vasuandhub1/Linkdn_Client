import React, { useEffect, useState } from 'react'
import { Box, Typography, Avatar, Button, Grid,CardContent,Card, IconButton, Divider,Chip, MenuItem ,Menu } from '@mui/material';
import {HomeWrapper,OptionButton,CreatePostOptions,FeedSection,Sidebar,PostHeader,PostActions,SuggestedUser,LeftSidebar,ProfileCard,ProfileAvatar} from "./DashboardComponentStyle"
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
import { NavLink } from 'react-router-dom';
import PostCardSkeleton from './PostCardSkeleton';

function Dashboard() {
  



  const [TogglePost,SetTogglePost] = useState<boolean>(false)
  const {name,profile,profiletag} = useSelector((state:RootState)=>state.auth)
  const [Posts,SetPosts] = useState([])
  const [Repost,SetRepost] = useState([])
  const [invitations,SetInvitations] = useState([])
  const [news,Setnews]= useState([])
  
  const [loader,Setloader]= useState(true)
  

   const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    if (option) {
      console.log("Selected sort:", option); // Or set state here
    }
    setAnchorEl(null);
  };
  // now handle the  sort according to the no of likes

  const SortOnTop = async()=>{
    try{
      Setloader(true)
      SetPosts([])
     const res = await axios.get(`${BASE_URL}/post/all/trending`,{withCredentials:true})
     console.log(res.data.data,"top")
     SetPosts(res?.data?.data)
     Setloader(false)
    }catch(err){
      console.log(err)
    }
  } 

  const getAllnews = async()=>{
    try{
      const res = await axios.get(`https://api.thenewsapi.com/v1/news/top?api_token=LzPqxSK6ODFPhTQrSMs15HJ0vK18GU4x7KfBRkB4&locale=us&limit=5`)
      console.log(res,"news")
      Setnews([...res?.data?.data]) 
    }catch(err){
      console.log(err)
    }

  }
  const SortOnDate = async()=>{
    try{
       Setloader(true)
      SetPosts([])
     const res = await axios.get(`${BASE_URL}/post/all/date`,{withCredentials:true})
     SetPosts(res.data.data)
      Setloader(false)
    }catch(err){
      console.log(err)
    }
  } 
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
    Setloader(false)
    }catch(err){
      console.log(err)
    }
  }

  const GetReposts= async()=>{
    try{
       Setloader(true)
      SetRepost([])
    const res = await axios.get(`${BASE_URL}/post/repost/all`,{withCredentials:true})
    
    SetRepost(res?.data?.data?.post)
    Setloader(false)
    }catch(err){
      console.log(err)
    }
  }
console.log(Posts,"posts")
  // useEffect(()=>{
  //   GetPosts()
  //   GetReposts()
  // },[])
  useEffect(()=>{
    GetPosts()
    GetReposts()
    getAllnews()
  },[TogglePost])

  console.log(news,"news")
  
  console.log(Posts,"postssss")

  return (
         <HomeWrapper>
          
      <LeftSidebar>
        
         <ProfileCard>
      {/* Background cover (mocked as solid for now) */}
      <Box height={60} borderRadius="1rem 1rem 0 0" bgcolor="#cce0ff" />
      <NavLink to={"/profile"}>
     <Box sx={{display:"flex", justifyContent:"center"}} >
      <NavigationAvatar 
      style={{width:"5rem", height:"5rem", border: '3px solid white',margin: '0 auto',marginTop: '-36px'}}
     coverImage={profile}
      src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
     />
     </Box>
     </NavLink>

      <Typography variant="h6" mt={1}>{name}</Typography>
      <Typography variant="body2" color="text.secondary">
        Student at Chameli Devi Group of Institutions, Gram Umrikheda, Near Indore
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Indore, Madhya Pradesh
      </Typography>

    </ProfileCard>
       

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

          <>
      <Divider sx={{ marginBottom: "1rem" }} textAlign='right'>
        <Chip
          label="Sort Feed"
          onClick={handleClick}
          sx={{ cursor: 'pointer' }}
        />
        
      </Divider>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => SortOnDate()}>Latest</MenuItem>
        <MenuItem onClick={() => SortOnTop()}>Trending</MenuItem>
      </Menu>
    </>

        {/* {dropdown} */}

        {
          !loader?
          Posts.map((post)=>{
            return (
              <Postcard post={post}/>
            )
          })
          
          :<PostCardSkeleton/>
        }
        {
          !loader?
          Repost.map((post)=>{
            return (
              <Repostcard post={post}/>
            )
          })
          
          :<PostCardSkeleton/>
        }

        {/* {Posts.map((post) => (
          <Postcard post={post}/>
        ))}
        {Repost.map((post)=>{
          return(
            <Repostcard post={post}/>
          )
        })} */}
        
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
          {news.map((elem)=>{
            return(
              <Card sx={{margin:"10px" ,padding:"10px"}}>
              <Typography variant="body1" gutterBottom>{elem.snippet}</Typography>
              </Card>
            )
          })}
          
        </Card>
      </Sidebar>
    </HomeWrapper>
  )
}

export default Dashboard
