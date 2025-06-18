import styled from "styled-components";
import { Card } from "@mui/material";
import {Box,Typography} from "@mui/material";

const ProfileCard = styled(Card)({
  borderRadius: '3rem',
  textAlign: 'center',
  background: '#fff',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  maxWidth: 300,
  margin: '0 auto',
});
const Container = styled(Box)`
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background-color: #f3f2ef;
  min-height: 100vh;
`;

const Sidebar = styled(Box)`
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  height: fit-content;
`;

const Main = styled(Box)`
  flex: 3;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom:1rem;
`;

const ProfileSection = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const ProfileInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SectionTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SuperMain = styled(Box)`
width:76%;
  gap:1
  border-radius: 12px;
`;

export {ProfileCard,Container,Sidebar,Main,ProfileSection,SectionTitle,ProfileInfo,SuperMain}