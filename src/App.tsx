import React, { useEffect } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import {Wrapper,SceenWrapper} from "./components/component"
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import OTP from './pages/OTP';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { BASE_URL } from './Baseurl';
import { login } from './Redux/slices/authSlice';


// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;



function App() {
  const dispatch = useDispatch()

  const refreshUser = async()=>{
    try{
      const res= await axios.get(`${BASE_URL}/User/User/Refresh`,{withCredentials:true})
      const payload ={
        email:res?.data?.data?.User?.email,
        name:res?.data?.data?.User?.name,
        _id:res?.data?.data?.User?._id,
        profile:res?.data?.data?.ImageURL
      }
      dispatch(login(payload))
      
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    refreshUser()
  },[])

  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/OTP/:EmailVerify/:email' element={<OTP/>}/>
        <Route path ='/ForgotPassword' element={<ForgotPasswordPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/ResetPassword' element={<ResetPasswordPage/>}/>
        <Route path='/Dashboard' element={<DashboardPage/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
