import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


 const SceenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 2rem; /* Adds spacing from edges */
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%); /* Fancy gradient */
  
  /* Optional: Responsive padding */
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
 background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%); /* Fancy gradient */
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* spacing between fields */
  width: 300px;
`;








export {SceenWrapper,Wrapper,FormWrapper}