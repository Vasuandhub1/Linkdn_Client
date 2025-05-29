import React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { Wrapper ,FormWrapper } from '../../../components/component'; // Ensure Wrapper is styled and imported correctly



// Optional: Style the form wrapper


const Login: React.FC = () => {
   interface Users{
    email:string,
    password:string,
  }


  const Mailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PasswordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

   const [Data,SetData] = useState<Users>({
      email:"",
      password:"",
    })

    const [Error,SetError] = useState<Users>({
      email:"",
      password:""
    })

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

      

  return (
    <Wrapper>
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
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </FormWrapper>
          <h4>Don't Have Account <NavLink to={"/Register"}>Register</NavLink> </h4>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Login;
