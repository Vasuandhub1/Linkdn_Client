import React, { useState } from 'react';
import {

  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
  FormControl,
  InputAdornment,
  Input,
  InputLabel,
  Chip
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ImageCarousel from './ImageCarousel';
import { PostHeader, PostActions, PostCard } from "./DashboardComponentStyle"
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Divider from '@mui/material/Divider';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"
import {NavigationAvatar} from "../component"


const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};




function Repostcard({ post }) {
  
  console.log(post, "post")
  const { profile, _id, name, email } = useSelector((state: RootState) => state.auth)
  const [liked, Setliked] = useState([...post?._doc?.likes])
  const [comments, Setcomments] = useState([...post?._doc?.comments])
  const [ToggleComment,SetToggleComment]  = useState(false)
  const [comment,Setcomment]= useState("")
  console.log(liked, "likde")

  const HandleLike = async () => {
    try {
      await axios.put(`${BASE_URL}/post/repost/like/${_id}/${post._doc._id}`, { withCredentials: true })
      if (liked.includes(_id)) {
        const temp = liked.filter((elem) => {
          if (elem === _id) {
            return false
          } else {
            return true
          }
        })
        Setliked([...temp])
      } else {
        const temp = [...liked]
        temp.push(_id)
        Setliked(temp)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const HandleToggle = ()=>{
    if(ToggleComment){
      SetToggleComment(false)
    }else{
      SetToggleComment(true)
    }
  }

  const HandleCommentSend = async()=>{
    try{
        if(!comment)return
      const payload = {user:_id ,text:comment}
      const temp =[...comments]
      const res = await axios.post(`${BASE_URL}/post/repost/comment/${_id}/${post?._doc?._id}`,{comment},{withCredentials:true})
      temp.push(payload)
      Setcomments([...temp])
      SetToggleComment(false)

    }catch(err){
      console.log(err)
    }
  }


  return (
    <PostCard>

      {/* repost compoenent  post?.postdetails?.user?.ProfileTag  post?._doc.?user?.ProfileTag */}

      {<PostHeader>
        <Box display="flex" gap={2} alignItems="center">
          
          <NavigationAvatar
          sx={{ width: 24, height: 24 }} 
            coverImage={post?.repostprofileUrl}
            src={post?.postdetails?.user?.ProfileTag===''?post?.repostprofileUrl:post?.postdetails?.user?.ProfileTag==="hiring"?hiring:post?.postdetails?.user?.ProfileTag==="opentowork"?opentowork:post?.repostprofileUrl}
          />
          <Box>
            <Typography variant="subtitle2">{post?.postdetails?.user?.name}</Typography>
            <Typography variant="caption" color="textSecondary">{post?.postdetails?.user?.description}</Typography>
          </Box>
         
        </Box>
         
        <IconButton>
        </IconButton>
      </PostHeader>}

      <Divider>
        <Chip label="reposted" />
      </Divider>
      
       
      {/* post */}
      <PostHeader>
        <Box display="flex" gap={2} alignItems="center">
          
          <NavigationAvatar
          coverImage={post?.profileUrl}
          src={post?._doc?.user?.ProfileTag===''?post?.profileUrl:post?._doc?.user?.ProfileTag==="hiring"?hiring:post?._doc?.user?.ProfileTag==="opentowork"?opentowork:post?.profileUrl}
          />
          <Box>
            <Typography variant="subtitle1">{post?._doc?.user?.name}</Typography>
            <Typography variant="caption" color="textSecondary">{post?._doc?.user?.description}</Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </PostHeader>

      <Box mt={2}>
        <Typography variant="body1">
          {post?.postdetails?.description}
        </Typography>
      </Box>
      <Box mt={2}>
        <ImageCarousel urls={post.urls} />
      </Box>
      {/* <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
     {post?.urls?.map((elem, index) => (
       <Box key={index} sx={{ width: 'calc(50% - 4px)' }}>
         <ImagePreview src={elem} style={{ width: '100%', borderRadius: 8 }} />
       </Box>
     ))}
   </Box> */}

      


      <PostActions>
        {liked.includes(_id) ? <Button startIcon={<ThumbUpAltIcon />} size="medium" onClick={HandleLike} color='secondary'>Liked {liked.length}</Button> : <Button startIcon={<ThumbUpOffAltIcon />} size="medium" onClick={HandleLike} color='primary'>Like {liked.length}</Button>}
        <Button startIcon={<MessageOutlinedIcon />} size="medium" onClick={HandleToggle} color='success'>Comment {comments.length}</Button>
        <Button startIcon={<ShareOutlinedIcon />} size="medium" color='warning'>Share</Button>
      </PostActions>

      {/* comment creation part */}

      {ToggleComment?
      <>
      {comments.map((elem)=>{
        return (
        <Box sx={{padding:"0.1rem"}}>
          <Divider/>
          <InputAdornment sx={{padding:"0.5rem", gap:"1rem"}} position='start'>
          <Avatar alt="Remy Sharp" src={profile} sx={{ width: 24, height: 24 }}/>
          <Typography textAlign='center'>{elem.text}</Typography>
          </InputAdornment>
          <Divider/>
      </Box>
        )
      })}
     
      <FormControl variant="standard" color='success' sx={{display:"flex", justifyContent:"center"}} >
        <InputLabel htmlFor="input-with-icon-adornment">
          Write Comment
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
         color='success'
         value={comment}
         onChange={(e:React.ChangeEvent<HTMLInputElement>)=>Setcomment(e.target.value)}
          startAdornment={
            <>
            <InputAdornment position="start">
            <Avatar alt="Remy Sharp" src={profile} sx={{ width: 24, height: 24 }}/>
            </InputAdornment> 
            </>
          }

          endAdornment={
             <InputAdornment position="end" >
              <Button color='success' onClick={HandleCommentSend} autoFocus><SendOutlinedIcon/></Button>
            </InputAdornment>
          }
        />
      </FormControl>
      </>
      :null}
    </PostCard>
  )
}

export default Repostcard
