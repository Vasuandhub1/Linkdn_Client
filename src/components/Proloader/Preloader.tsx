import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import loader from "../../assets/Animation - 1749733704156.gif"


function Preloader() {
    const navigate = useNavigate()

    const HandlePreloader = ()=>{
        setTimeout(()=>{
            navigate("/Dashboard")
        },6000)
    }
    useEffect(()=>{
        HandlePreloader()
    },[])
  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <DotLottieReact
      src="https://lottie.host/29183a01-5f4d-4717-9265-5f02aa3e9243/bJdFC9uGEr.lottie"
      loop
      autoplay
    />
    </Box>
  )
}

export default Preloader
