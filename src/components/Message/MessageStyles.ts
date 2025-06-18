import {
  Box,
  TextField,
  Card,
} from '@mui/material';
import styled from 'styled-components';

const Container = styled(Box)`
width:screen;
  display: flex;
  height: 100vh;
  background:#f4f4f4;
  gap: 1rem;
  padding: 1rem;
`;

const Sidebar = styled(Box)`
  width: 25rem;
  background: #fff;
  border-right: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
`;
const SidebarChat = styled(Box)`
height:40rem;
 display:flex;
  background: #fff;
  border-right: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
`;
const SidebarOuter = styled(Box)`
width: 90%;
height:100;
  border-right: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
`;

const RightSection = styled(Box)`
  width: 330px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ccc;
  border-radius: 16px;
  overflow: hidden;
`;

const SidebarHeader = styled(Box)`

  padding: 0.5rem;
  background-color: white;
  color: black;
  font-weight:bold;
  font-size:2rem;
  font-family:sens;
  display: flex;
  align-items: center;
`;

const SidebarSearch = styled('input')`
  width: 13rem;
  padding:0.3rem;
  font-size:1rem;
  border:#f4f4f4;
  margin-left:1rem;
  height:2rem !important;
  background: #f4f4f4;
  border-radius: 8px;
`;

const TabBar = styled(Box)`
width: 330px;
  display: flex;
  padding: 0.5rem 1rem;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const MessageList = styled(Box)`
width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`;

const MessageItem = styled(Box)`
  width: 90%;
  display: flex;
  align-item:center;
  padding: 0.75rem 1rem;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  background: ${({ selected }) => (selected ? '#e7f3ff' : 'transparent')};
  &:hover {
    background: #f0f4f8;
  }
`;

const ChatArea = styled(Box)`

  flex: 1;
  width:10rem;
  display: flex;
  flex-direction: column;
  background:white;
  border-radius: 16px;
  overflow: hidden;
`;

const ChatHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  background-color: #f9fafb;
`;

const ChatBody = styled(Box)`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f5f8fa;
`;

const ChatFooter = styled(Box)`
  padding: 1rem;
  border-top: 1px solid #ccc;
  background-color: #fff;
`;

const AdCard = styled(Card)`
  padding: 1rem;
  margin: 1rem;
  background: #e6f3ff;
  border-radius: 16px;
`;

const PremiumCard = styled(Card)`
  padding: 1rem;
  margin: 1rem;
  background: #fff7e6;
  border-radius: 16px;
`;


export {PremiumCard,AdCard,Search,SidebarChat,ChatArea,SidebarOuter,ChatFooter,ChatHeader,ChatBody,MessageItem,MessageList,TabBar,Sidebar,Container,SidebarSearch,SidebarHeader,RightSection}