import React, { useState,useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Wrapper } from '../../../components/component'; // Ensure Wrapper is styled and imported correctly
import { FormWrapper } from '../../../components/component';
import { NavLink } from 'react-router-dom';

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

    const [Error,SetError] = useState<Users>({
      name:"",
        email:"",
        password:"",
        confirmPassword:""
      })

  let Mailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let PasswordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;


  const HandleInputs = async (e:React.ChangeEvent<HTMLInputElement>)=>{
    SetData({...Data,[e.target.name]:e.target.value})
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
            <Button variant="contained" color="primary" fullWidth>
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
