import styled from "styled-components";



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








export {SceenWrapper,Wrapper,FormWrapper}