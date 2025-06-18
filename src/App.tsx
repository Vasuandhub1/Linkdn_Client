import React, { useEffect } from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Cookies from 'js-cookie';

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
import ProtectedRoute from "./routes/ProtectedRoute"
import NetworkPage from './pages/NetworkPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ConnectionPage from './pages/ConnectionPage';
import MessagePage from './pages/MessagePage';
import PreloaderPage from './pages/PreloaderPage';

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;



function App() {
  const dispatch = useDispatch()
  const token = Cookies.get('User')
  const refreshUser = async()=>{
    try{
      const res= await axios.get(`${BASE_URL}/User/refresh/${token}`,{withCredentials:true})
      console.log(res?.data?.data?.User?.ProfileTag,"rea")
      const payload ={
        email:res?.data?.data?.User?.email,
        name:res?.data?.data?.User?.name,
        _id:res?.data?.data?.User?._id,
        profile:res?.data?.data?.ImageURL,
        profiletag:res?.data?.data?.User?.ProfileTag,
        loading:false,
      }
      dispatch(login(payload))
      
    }catch(err){
      const payload ={
        email:"",
        name:"",
        _id:"",
        profile:"",
        loading:false,
        profiletag:""
      }
      dispatch(login(payload))
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
        <Route path='/' element={<PreloaderPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/OTP/:EmailVerify/:email' element={<OTP/>}/>
        <Route path ='/ForgotPassword' element={<ForgotPasswordPage/>}/>
        <Route path='/ResetPassword' element={<ResetPasswordPage/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/Dashboard' element={<DashboardPage/>}/>
        <Route path='/networks' element={<NetworkPage/>}/>
        <Route path='/Connections' element={<ConnectionPage/>}/>
        <Route path='/message' element={<MessagePage/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
