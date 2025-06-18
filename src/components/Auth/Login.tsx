import React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { Wrapper ,FormWrapper } from '../component'; // Ensure Wrapper is styled and imported correctly
import { BASE_URL } from '../../Baseurl';
import { Alert } from '@mui/material';
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import {  login } from '../../Redux/slices/authSlice';






const Login: React.FC = () => {
   interface Users{
    email:string,
    password:string,
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const Mailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PasswordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

   const [Data,SetData] = useState<Users>({
      email:"",
      password:"",
    })

    const [message,Setmessage] = useState<string|null>()

    const [Error,SetError] = useState<Users>({
      email:"",
      password:""
    })

    const HandleInputs = async (e:React.ChangeEvent<HTMLInputElement>)=>{
        SetData({...Data,[e.target.name]:e.target.value})
      }

      const HandleLogin = async()=>{
        const res  = await axios.post(`${BASE_URL}/Auth/Login`,{...Data},{withCredentials:true})
        console.log(res,"login")
        if(res?.status === 201){
          const payload = {
            email:res?.data?.data?.email,
            name:res?.data?.data?.name,
            _id:res?.data?.data?._id,
            profile:res.data.data.profile,
            profiletag:res?.data?.data?.ProfileTag,
            loading:false
          }
          dispatch(login(payload))
          Setmessage(res?.data?.message)
          setTimeout(()=>{
            Setmessage(null)
            navigate("/profile")
          },3000)
        }else{
          Setmessage("Error Occured")
          setTimeout(()=>{
            Setmessage(null)
          },3000)
        }
      }

      
      useEffect(()=>{
        if(!Mailregex.test(Data.email) && Data.email!=""){
          SetError({...Error,email:"Please Enter Valid Email"})
        }else{
          SetError({...Error,email:""})
        }
      },[Data.email])

      useEffect(()=>{
          if(!PasswordRegex.test(Data.password) && Data.password!=""){
          SetError({...Error,password:"Must Contain:(A-Z, a-b ,1-0)"})
        }else{
          SetError({...Error,password:""})
        }
      },[Data.password])

      

  return (
    <Wrapper>
      {message?message==="Error Occured"?<Alert severity="error">{message}</Alert>:<Alert severity="success">{message}</Alert>:null}
      <Card sx={{ padding: 3, minWidth: 350 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <FormWrapper>
            {Error.email?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.email}</p>:null}
            <TextField label="Email" type="email" name='email' onChange={HandleInputs} value={Data.email} variant="outlined" fullWidth />
            {Error.password?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.password}</p>:null}
            <TextField label="Password" type="password" name='password' onChange={HandleInputs} value={Data.password} variant="outlined" fullWidth />
            <Button variant="contained" onClick={HandleLogin} color="primary" fullWidth>
              Login
            </Button>
          </FormWrapper>
          <p><NavLink to={"/ForgotPassword"}>ForgotPassword?</NavLink> </p>
          <h4>Don't Have Account <NavLink to={"/Register"}>Register</NavLink> </h4>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Login;
