import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Wrapper } from '../component'; 
import { FormWrapper } from '../component';
import { NavLink } from 'react-router-dom';
import axios from "axios"
import { BASE_URL } from '../../Baseurl';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from 'styled-components';


function Register() {
  interface Users{
    name:string,
    email:string,
    password:string,
    confirmPassword:string
  }

  const [Data,SetData] = useState<Users>({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })

  const [file,Setfile]=useState<null|File>(null)

  const navigate = useNavigate()

    const [Error,SetError] = useState<Users>({
      name:"",
        email:"",
        password:"",
        confirmPassword:""
      })

      const [message,SetMesage]=useState<string|null>()

      const [loading,SetLoading]=useState<boolean>(false)

  const Mailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PasswordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;


  const HandleInputs = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    SetData({...Data,[e.target.name]:e.target.value})
  }

  const HandleRegister = async()=>{
    const formdata = new FormData()
    formdata.append("name",Data.name)
    formdata.append("email",Data.email)
    formdata.append("password",Data.password)
    formdata.append("file",file!)
    const res = await axios.post(`${BASE_URL}/Auth/Register`,formdata) 
    console.log(res)
    if(res.status===201){
      SetLoading(true)
      SetMesage(res?.data?.message)
      setTimeout(() => {
        SetMesage(null)
        SetLoading(false)
        navigate(`/OTP/EmailVerify/${Data.email}`)
      }, 3000);
    }else{
      SetMesage("Error Occured")
      setTimeout(() => {
        SetMesage(null)
      }, 3000);
    }
  }

  const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

console.log(file,"file")
 
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
  
   useEffect(()=>{
            if(!PasswordRegex.test(Data.confirmPassword) && Data.confirmPassword!="" ){
            SetError({...Error,confirmPassword:"Must Contain:(A-Z, a-b ,1-0)"})
            }
            else if(Data.password != Data.confirmPassword){
              SetError({...Error,confirmPassword:"Password Does Not match"})
            }else{
            SetError({...Error,confirmPassword:""})
          }
        },[Data.confirmPassword])      

  return (
    <Wrapper>
      {message?message==="Error Occured"?<Alert severity="error">{message}</Alert>:<Alert severity="success">{message}</Alert>:null}
      <Card sx={{ padding: 3, minWidth: 350 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Register
          </Typography>
          <FormWrapper>
            <TextField label="Name" type="text" onChange={HandleInputs} value={Data.name} variant="outlined" name='name' fullWidth />
            {Error.email?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.email}</p>:null}
            <TextField label="Email" type="email" onChange={HandleInputs} value={Data.email} variant="outlined" name='email' fullWidth />
             {Error.password?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.password}</p>:null}
            <TextField label="Password" type="password" onChange={HandleInputs} value={Data.password} variant="outlined" name="password" fullWidth />
            {Error.confirmPassword?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.confirmPassword}</p>:null}
            <TextField label="Confirm Password" type="Confirm password" value={Data.confirmPassword} onChange={HandleInputs} name="confirmPassword" variant="outlined" fullWidth />
            <Button  component="label" role={undefined} variant="outlined" tabIndex={-1} startIcon={<CloudUploadIcon />}>{!file?"Upload Profile Photo":file.name}
      <VisuallyHiddenInput
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
       if(event.target.files && event.target.files.length > 0) {
       Setfile(event.target.files[0]);}
}}
        multiple
      />
    </Button>
            <Button loading={loading} loadingPosition='start' loadingIndicator="loading..."  variant="contained" onClick={HandleRegister} color="primary" fullWidth>
              Register
            </Button>
          </FormWrapper>
        </CardContent>
        <h4>Don't Have Account <NavLink to={"/Login"}>Login</NavLink> </h4>
      </Card>
    </Wrapper>
  )
}

export default Register
