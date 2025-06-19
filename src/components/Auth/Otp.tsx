import React, { useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Wrapper } from "../component"; 
import { FormWrapper } from '../component';

import axios from "axios"
import { BASE_URL } from '../../Baseurl';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

function Otp() {

    const [OTP,Setotp]= useState<string|null>()
    const [Message,SetMessage] = useState<string|null>("")

    const HandleInputs = (e:React.ChangeEvent<HTMLInputElement>)=>{
        Setotp(e.target.value)
    }

    const {email,EmailVerify} = useParams()

    const navigate = useNavigate()

    const HandleVerify = async()=>{
      if(EmailVerify == "EmailVerify"){
      if(!OTP || OTP.length<6){
        if(OTP?.length || 0 < 6){
          SetMessage("Please Enter OTP of 6 Digits")
          return
        }
        SetMessage("Please Enter OTP")
        return 
      }
        const res = await axios.post(`${BASE_URL}/Auth/Verify`,{OTP,email})
        console.log(res,"hello")
        if(res.status === 202){
            SetMessage(res?.data?.message)
            setTimeout(()=>{
                SetMessage(null)
                navigate("/Login")
            },3000)
        }else{
            SetMessage("OTP did not match")
            setTimeout(() => {
                SetMessage(null)
            },3000);
        } 
      }
      else{
        // 
        if(!OTP || OTP.length<6){
        if(OTP?.length || 0 < 6){
          SetMessage("Please Enter OTP of 6 Digits")
          return
        }
        SetMessage("Please Enter OTP")
        return 
      }
        const res = await axios.post(`${BASE_URL}/Auth/VerifyOTP`,{OTP},{withCredentials:true})
        console.log(res,"hello")
        if(res.status === 200){
            SetMessage(res?.data?.message)
            setTimeout(()=>{
                SetMessage(null)
                navigate("/ResetPassword")
            },3000)
        }else{
            SetMessage("OTP did not match")
            setTimeout(() => {
                SetMessage(null)
            },3000);
        } 
        return
      }
      
    }
  return (
   <Wrapper>
     {Message?Message==="Error Occured" || Message === "Please Enter OTP" || Message === "Please Enter OTP of 6 Digits" || Message ==="OTP did not match"?<Alert severity="error">{Message}</Alert>:<Alert severity="success">{Message}</Alert>:null}
         <Card sx={{ padding: 3, minWidth: 350 }}>
           <CardContent>
             <Typography variant="h4" align="center" gutterBottom>
               Verify OTP
             </Typography>
             <FormWrapper>
               <TextField label="OTP" type="text" name='password' onChange={HandleInputs} value={OTP} variant="outlined" fullWidth />
               <Button variant="contained" onClick={HandleVerify} color="primary" fullWidth>
                 Verify
               </Button>
             </FormWrapper>
           </CardContent>
         </Card>
       </Wrapper>
  )
}

export default Otp
