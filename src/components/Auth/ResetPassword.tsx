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
import { useNavigate } from 'react-router-dom';


function ResetPassword() {

    const PasswordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
    interface dataType{
        password:String
        ConfirmPassword:String
    }
    const navigate = useNavigate()
    const [Data,SetData]= useState<dataType>({
        password:"",
        ConfirmPassword:""
    })
     const [Error,SetError] = useState<dataType>({
          ConfirmPassword:"",
          password:""
        })
    const [message,Setmessage]=useState<string|null>()    

    const HandleInputs = async (e:React.ChangeEvent<HTMLInputElement>)=>{
            SetData({...Data,[e.target.name]:e.target.value})
          }

           useEffect(()=>{
                    if(!PasswordRegex.test(Data.password) && Data.password!=""){
                    SetError({...Error,password:"Must Contain:(A-Z, a-b ,1-0)"})
                  }else{
                    SetError({...Error,password:""})
                  }
                },[Data.password])

           useEffect(()=>{
                    if(!PasswordRegex.test(Data.ConfirmPassword) && Data.ConfirmPassword!=""){
                    SetError({...Error,ConfirmPassword:"Must Contain:(A-Z, a-b ,1-0)"})
                  }else{
                    SetError({...Error,ConfirmPassword:""})
                  }
                },[Data.ConfirmPassword])

        const HandleLogin = async()=>{
            if(Data.password != Data.ConfirmPassword){
                Setmessage("Please Fill all the details")
                return
            }
        const res  = await axios.post(`${BASE_URL}/Auth/PasswordReset`,{password:Data.password},{withCredentials:true})
        console.log(res)
        if(res?.status === 200){
          Setmessage(res?.data?.message)
          setTimeout(()=>{
            navigate("/Login")
            Setmessage(null)
          },3000)
        }else{
          Setmessage("Error Occured")
          setTimeout(()=>{
            Setmessage(null)
          },3000)
        }
      }
  return (
    <Wrapper>
      {message?message==="Error Occured"?<Alert severity="error">{message}</Alert>:<Alert severity="success">{message}</Alert>:null}
      <Card sx={{ padding: 3, minWidth: 350 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
          <FormWrapper>
            
            {Error.password?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.password}</p>:null}
            <TextField label="Password" type="password" name='password' onChange={HandleInputs} value={Data.password} variant="outlined" fullWidth />
            {Error.ConfirmPassword?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.ConfirmPassword}</p>:null}
            <TextField label="Confirm Password" type="password" name='ConfirmPassword' onChange={HandleInputs} value={Data.ConfirmPassword} variant="outlined" fullWidth />
            <Button variant="contained" onClick={HandleLogin} color="primary" fullWidth>
              Login
            </Button>
          </FormWrapper>
          <p><NavLink to={"/ForgotPassword"}>ForgotPassword?</NavLink> </p>
          <h4>Don't Have Account <NavLink to={"/Register"}>Register</NavLink> </h4>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export default ResetPassword
