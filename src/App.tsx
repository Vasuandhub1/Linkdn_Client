import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"

import {Wrapper,SceenWrapper} from "./components/component"
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';


// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;



function App() {
  return (
    <SceenWrapper>
      <BrowserRouter>
      <Routes>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
      </Routes>
      </BrowserRouter>
    </SceenWrapper>
  );
}

export default App;
