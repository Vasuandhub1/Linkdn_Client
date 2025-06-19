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
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';


import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ImageCarousel from './ImageCarousel';
import { PostHeader, PostActions, PostCard } from "./DashboardComponentStyle";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png";
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png";
import { NavigationAvatar } from "../component";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';




interface PostProps {
  post: {
    _id: string;
    user: { _id: string; name: string; description: string; ProfileTag: string };
    likes: string[];
    comments: { user: string; text: string }[];
    repost: string[];
    description: string;
    profileUrl: string;
    urls: string[];
  };
}

function Postcard({ post }: PostProps) {
  const { profile, _id } = useSelector((state: RootState) => state.auth);
  const [liked, Setliked] = useState(post.likes || []);
  const [comments, Setcomments] = useState(post.comments || []);
  const [ToggleComment, SetToggleComment] = useState(false);
  const [comment, Setcomment] = useState("");
  const [Repost, SetRepost] = useState(post.repost || []);
  const [deleteWarning, SetdeletWarning] = useState(false);
 
  

 

  const HandleLike = async () => {
    try {
      await axios.put(`${BASE_URL}/post/like/${_id}/${post._id}`, {}, { withCredentials: true });
      if (liked.includes(_id||"")) {
        Setliked(liked.filter((elem: string) => elem !== _id));
      } else {
        Setliked([...liked, _id || ""]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleCancel = () => {
    SetdeletWarning(false);
  };

  const HandleToggle = () => {
    SetToggleComment(!ToggleComment);
  };

  const HandleRepost = async () => {
    try {
      if (_id === post.user._id) {
        alert("You cannot repost your own post");
        return;
      }
      await axios.post(`${BASE_URL}/post/repost/${_id}/${post._id}`, {}, { withCredentials: true });
      SetRepost([...Repost, _id || ""]);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleCommentSend = async () => {
    try {
      if (!comment) return;
      const payload = { user: _id || "", text: comment };
      await axios.post(`${BASE_URL}/post/comment/${_id}/${post._id}`, { comment }, { withCredentials: true });
      Setcomments([...comments, payload]);
      SetToggleComment(false);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDeletePost = async () => {
    try {
      await axios.delete(`${BASE_URL}/post/${_id}/${post._id}`);
      HandleCancel();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PostCard>
      {/* <PostSharePopup open={open} onClose={() => setOpen(false)} connections={Connections} /> */}

      <Dialog open={deleteWarning} onClose={HandleCancel}>
        <DialogTitle>Delete post?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete your post? All reposts related to this post will be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleCancel}>Disagree</Button>
          <Button onClick={HandleDeletePost} autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>

      <PostHeader>
        <Box display="flex" gap={2} alignItems="center">
          <NavigationAvatar
            coverImage={post.profileUrl}
            src={post.user.ProfileTag === '' ? profile : post.user.ProfileTag === "hiring" ? hiring : post.user.ProfileTag === "opentowork" ? opentowork : profile}
          />
          <Box>
            <Typography variant="subtitle1">{post.user.name}</Typography>
            <Typography variant="caption" color="textSecondary">{post.user.description}</Typography>
          </Box>
        </Box>
        {_id === post.user._id && (
          <IconButton onClick={HandleCancel}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        )}
      </PostHeader>

      <Box mt={2}>
        <Typography variant="body1">{post.description}</Typography>
      </Box>

      <Box mt={2}>
        <ImageCarousel urls={post.urls} />
      </Box>

      <PostActions>
        <Button
          startIcon={liked.includes(_id||"") ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
          size="medium"
          onClick={HandleLike}
          color={liked.includes(_id||"") ? 'secondary' : 'primary'}
        >
          Like {liked.length}
        </Button>

        <Button startIcon={<MessageOutlinedIcon />} size="medium" onClick={HandleToggle} color='success'>Comment {comments.length}</Button>
        <Button startIcon={<DynamicFeedOutlinedIcon />} size="medium" onClick={HandleRepost} color='error'>Repost {Repost.length}</Button>
        <Button startIcon={<ShareOutlinedIcon />} size="medium" color='warning' >Share</Button>
      </PostActions>

      {ToggleComment && (
        <>
          {comments.map((elem, i) => (
            <Box key={i} sx={{ padding: "0.1rem" }}>
              <Divider />
              <InputAdornment sx={{ padding: "0.5rem", gap: "1rem" }} position='start'>
                <Avatar src={profile} sx={{ width: 24, height: 24 }} />
                <Typography>{elem.text}</Typography>
              </InputAdornment>
              <Divider />
            </Box>
          ))}

          <FormControl variant="standard" color='success'>
            <InputLabel htmlFor="input-comment">Write Comment</InputLabel>
            <Input
              id="input-comment"
              color='success'
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => Setcomment(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Avatar src={profile} sx={{ width: 24, height: 24 }} />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Button color='success' onClick={HandleCommentSend}><SendOutlinedIcon /></Button>
                </InputAdornment>
              }
            />
          </FormControl>
        </>
      )}
    </PostCard>
  );
}

export default Postcard;