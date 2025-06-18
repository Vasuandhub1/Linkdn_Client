import React, { useEffect, useState } from 'react';
import {

  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
  FormControl,
  InputAdornment,
  Input,
  InputLabel
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
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};




function Postcard({ post }) {
  
  const { profile, _id, name, email } = useSelector((state: RootState) => state.auth)
  const [liked, Setliked] = useState([...post?.likes])
  const [comments, Setcomments] = useState([...post?.comments])
  const [ToggleComment,SetToggleComment]  = useState(false)
  const [comment,Setcomment]= useState("")
  const [Repost,SetRepost] = useState([...post?.repost])
  const [deleteWarning,SetdeletWarning]=useState(false)
 

  const HandleLike = async () => {
    try {
      await axios.put(`${BASE_URL}/post/like/${_id}/${post._id}`, { withCredentials: true })
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

  const HandleCancel = ()=>{
    if(deleteWarning){
      SetdeletWarning(false)
    }else{
      SetdeletWarning(true)
    }
  }

  const HandleToggle = ()=>{
    if(ToggleComment){
      SetToggleComment(false)
    }else{
      SetToggleComment(true)
    }
  }

  const HandleRepost = async()=>{
    try{
      if(_id == post.user._id ){
        alert("your can not repot your post")
        return 
      }
      const temp =[...Repost]
      const res= await  axios.post(`${BASE_URL}/post/repost/${_id}/${post._id}`,'',{withCredentials:true})
      temp.push(_id)
      SetRepost([...temp])
    }catch(err){
      console.log(err)
    }
  }

  const HandleCommentSend = async()=>{
    try{
      if(!comment)return
      const payload = {user:_id ,text:comment}
      const temp =[...comments]
      const res = await axios.post(`${BASE_URL}/post/comment/${_id}/${post?._id}`,{comment},{withCredentials:true})
      temp.push(payload)
      Setcomments([...temp])
      SetToggleComment(false)

    }catch(err){
      console.log(err)
    }
  }

  const HandleDeletePost = async()=>{
    try{
      await axios.delete(`${BASE_URL}/post/${_id}/${post?._id}`)
      HandleCancel()
    }catch(err){
      console.log(err)
    }
  }


  return (
    <PostCard>

      {/* {deleet model} */}

       <React.Fragment>
      <Dialog
        open={deleteWarning}
        onClose={HandleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delet your post,
            All the reposts releted to the posts will get deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleCancel}>Disagree</Button>
          <Button onClick={HandleDeletePost} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>

      {/* repost compoenent */}

      {post?._doc?.repost.includes(_id)?<PostHeader>
        <Box display="flex" gap={2} alignItems="center">
          <Avatar src={profile} />
          <Box>
            <Typography variant="subtitle1">{post?.user?.name}</Typography>
            <Typography variant="caption" color="textSecondary">{post?.user?.description}</Typography>
          </Box>
        </Box>
        {/* Adding delete button */}


        <IconButton>
          <MoreVertIcon  />
        </IconButton>
        

        
      </PostHeader>:null}

      {/* post */}


      <PostHeader>
        <Box display="flex" gap={2} alignItems="center">
          <NavigationAvatar
          coverImage={post.profileUrl}
          src={post?.user?.ProfileTag===''?profile:post?.user?.ProfileTag==="hiring"?hiring:post?.user?.ProfileTag==="opentowork"?opentowork:profile}
          />
          <Box>
            <Typography variant="subtitle1">{post?.user?.name}</Typography>
            <Typography variant="caption" color="textSecondary">{post?.user?.description}</Typography>
          </Box>
        </Box>

        {_id === post?.user?._id ?
        <IconButton onClick={HandleCancel}>
          <DeleteForeverOutlinedIcon />
        </IconButton>:null}

      </PostHeader>

      <Box mt={2}>
        <Typography variant="body1">
          {post?.description}
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
        {liked.includes(_id) ?<> <Button startIcon={<ThumbUpAltIcon />} size="medium" onClick={HandleLike} color='secondary'>Like {liked.length}</Button>
        
         </>: <><Button startIcon={<ThumbUpOffAltIcon />} size="medium" onClick={HandleLike} color='primary'>Like {liked.length}</Button>
        
         </>}
        <Button startIcon={<MessageOutlinedIcon />} size="medium" onClick={HandleToggle} color='success'>Comment {comments.length}</Button>
        <Button startIcon={<DynamicFeedOutlinedIcon />} size="medium" onClick={HandleRepost} color='error'>Repost {Repost.length}</Button>
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

export default Postcard
