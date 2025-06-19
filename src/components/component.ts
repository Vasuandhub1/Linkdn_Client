import styled from "styled-components";
import { Avatar } from "@mui/material";



 const SceenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 2rem; /* Adds spacing from edges */
  background: var(--Auth-bg-color); 
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  box-sizing:border-box;
 background: var(--Auth-bg-color); 
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
`;

interface NaviAva{
  coverImage?:string|null
  ProfileSize?:number
}

const NavigationAvatar = styled(Avatar)<NaviAva>(({coverImage,ProfileSize})=>({
    width: `${ProfileSize}rem`,
  height: `${ProfileSize}rem`,
  border: '4px solid white',
  borderRadius: '50%', 
  backgroundImage: `url(${coverImage || 'https://via.placeholder.com/150'})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover', 
}))

export {NavigationAvatar}








export {SceenWrapper,Wrapper,FormWrapper}