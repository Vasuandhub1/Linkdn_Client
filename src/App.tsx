import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"

import {Wrapper,SceenWrapper} from "./components/component"
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import OTP from './pages/OTP';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';


// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;



function App() {
  return (
    
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/OTP/:EmailVerify/:email' element={<OTP/>}/>
        <Route path ='/ForgotPassword' element={<ForgotPasswordPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/ResetPassword' element={<ResetPasswordPage/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
