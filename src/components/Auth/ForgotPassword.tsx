import React ,{useState,useEffect} from 'react'
import { Wrapper } from '../component'
import { Card } from '@mui/material'
import {CardContent} from '@mui/material'
import {Typography} from '@mui/material'
import { FormWrapper } from '../component'
import {TextField} from '@mui/material'
import {Button} from '@mui/material'
import axios from 'axios'
import { BASE_URL } from '../../Baseurl'
import { useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material'

function ForgotPassword() {

    const Mailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    interface Users{
    email:string,
    password:string,
  }

  const navigate = useNavigate()

    const [Message,SetMesage] = useState<string|null>("")
    const [Email,SetEmail] = useState<string>("")
    const [Error,SetError] = useState<Users>({
          email:"",
          password:""
        })

    const handleEmail = (e:React.ChangeEvent<HTMLInputElement>)=>{
        SetEmail(e.target.value)
    }

    const HandleVerify = async()=>{
        
        try{
            if(!Email){
             SetMesage("Please Enter the Email First")
                  setTimeout(() => {
                    SetMesage(null)
        },3000)
            return 
        }
        const res = await axios.post(`${BASE_URL}/Auth/ForgotPassword`,{email:Email},{withCredentials:true})
        console.log(res)
        if(res.status === 200){

            SetMesage(res?.data?.message)
                  setTimeout(() => {
                    SetMesage(null)
                    navigate(`/OTP/"ForgotPassword"/${Email}`)
        },3000)
        return
    }
}catch(err:any){
      SetMesage(err.message)
      setTimeout(() => {
        SetMesage(null)
      }, 3000);
      return
}
      
    
}

    useEffect(()=>{
            if(!Mailregex.test(Email) && Email!=""){
              SetError({...Error,email:"Please Enter Valid Email"})
            }else{
              SetError({...Error,email:""})
            }
          },[Email])

  return (
   <Wrapper>
    
         <Card sx={{ padding: 3, minWidth: 350 }}>
            {Message?Message!="Email send to reset password"?<Alert severity="error">{Message}</Alert>:<Alert severity="success">{Message}</Alert>:null}
           <CardContent>
             <Typography variant="h4" align="center" gutterBottom>
               Enter Email 
             </Typography>
             <Typography variant="h6" align="center" gutterBottom>
                Reset Password 
             </Typography>
             <FormWrapper>
                {Error.email?<p style={{padding:"0px", height:"1px", color:"red"}}>{Error.email}</p>:null}
               <TextField label="Email" type="text" name='email' onChange={handleEmail} value={Email} variant="outlined" fullWidth />
               <Button variant="contained" onClick={HandleVerify} color="primary" fullWidth>
                 Verify Email
               </Button>
             </FormWrapper>
           </CardContent>
         </Card>
       </Wrapper>
  )
}

export default ForgotPassword
