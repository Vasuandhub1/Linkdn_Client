import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import {UserBox,StyledAvatar,ImagePreview,ModalHeader} from "./DashboardComponentStyle"
import auth from "../../Redux/slices/authSlice"
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../Baseurl';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import PostCard from './PostCard';
import Box from '@mui/material/Box';


export default function CreatePostModal({open,setopen}){

const {name,profile,email,_id} = useSelector((state:RootState)=>state.auth)
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [alert,Setalert]=useState("")
  const [loader,Setloader]=useState(false)
 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
   if(files){
    // collect to 
    const arr = Array.from(files)
    setImages([...images,...arr])
   }
  };



  const handleClose = () => {
    setImages([])
    setopen(false);
  };

  const handlePost = async() => {
    try{
        Setloader(true)
         const formdata = new FormData()
         formdata.append("description",description)
         formdata.append("user",_id)
         images.forEach((elem)=>formdata.append("file",elem))
        const res = await axios.post(`${BASE_URL}/post/create`,formdata,{withCredentials:true})
        
        if(res){
            Setloader(false)
        }
        Setalert("Succescfuly created the post")
        setTimeout(()=>{
            Setalert("")
            handleClose();
            setDescription("")
        },3000)

    }catch(err){
        console.log(err)
    }
    
  };
  console.log(images,description)

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" PaperProps={{ style: { borderRadius: 16 } }}>
        {alert?<Alert>{alert}</Alert>:null}
      <DialogTitle>
        <ModalHeader>
          <Typography variant="h6">Create a Post</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>
      </DialogTitle>

<DialogContent>
        <UserBox>
          <StyledAvatar src={profile} />
          <Typography variant="subtitle1">{name}</Typography>
        </UserBox>
        

        <TextField
          autoFocus
          multiline
          rows={5}
          fullWidth
          variant="outlined"
          placeholder="What do you want to talk about?"
          value={description}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />

        <Box mt={2}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-button"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-button">
            <Button variant="outlined" startIcon={<ImageIcon />} component="span">
              Add Photo
            </Button>
          </label>
        </Box>

        {/* {images && <ImagePreview src={images} alt="Post Preview" />} */}
        {images?images.map((elem,index)=>{
            return(
            <ImagePreview key={index} src={URL.createObjectURL(elem)}/>
            )
        }):null}
      </DialogContent>
      

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" loading={loader} onClick={handlePost} disabled={!description}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
