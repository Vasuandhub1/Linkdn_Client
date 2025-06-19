import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Badge,
  Chip
} from '@mui/material';
import {
  PremiumCard, AdCard, MessageItem, SidebarChat, MessageList, ChatArea, 
  Sidebar, Container, SidebarSearch, SidebarHeader, RightSection, SidebarOuter,
   ChatBody
} from "./MessageStyles";
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import Chatarea from './Chatarea';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { NavigationAvatar } from '../component';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png";
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const WS_URL = import.meta.env.VITE_WEBSOCKET_URL as string;

interface Connection {
  Connections: {
    _id: string;
    name: string;
    email: string;
    profilePic: string;
    ProfileTag: string;
  };
  unseen: number;
}

const Message = () => {
  const [Connections, SetConnections] = useState<Connection[]>([]);
  const [Selected, Setselected] = useState<Connection | null>(null);
  const [input, Setinput] = useState("");
  const [search, Setsearch] = useState<Connection[]>([]);
  const [isSocketReady, setIsSocketReady] = useState(false);

  const ws = useRef<WebSocket | null>(null);

  const { _id, name } = useSelector(
    (state: RootState) => state.auth
  );

  const connectWs = async () => {
    const websocket = new WebSocket(WS_URL);

    websocket.onopen = () => {
      setIsSocketReady(true);

      websocket.send(
        JSON.stringify({ type: "connection", name: name, _id: _id })
      );

      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "RecivedMessage") {
          let temp = [...Connections];
          temp = temp.map((elem) => {
            if (
              _id === data.data.recipient &&
              data.data.sender === elem.Connections._id &&
              (!Selected || elem.Connections._id !== Selected.Connections._id)
            ) {
              elem.unseen += 1;
            }
            return elem;
          });
          if (temp.length > 0) {
            SetConnections(temp);
          }
        }
      };
    };

    ws.current = websocket;
  };

  const GetAllConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/network/connections/${_id}`);
      const temp = res?.data?.data||[];
      SetConnections(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    Setinput(e.target.value);
    if (e.target.value === "") {
      Setsearch([]);
    } else {
      const temp = Connections.filter((elem) =>
        elem.Connections.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      Setsearch(temp);
    }
  };

  const HandleSelect = (user: Connection, index: number) => {
    Setselected(user);
    const temp = [...Connections];
    temp[index].unseen = 0;
    SetConnections(temp);
  };

  useEffect(() => {
    GetAllConnections();
  }, []);

  useEffect(() => {
    connectWs();
    return () => {
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
    };
  }, []);

  return (
    <Container>
      <SidebarOuter>
        <SidebarHeader>
          <Typography variant="h4">Messaging</Typography>
          <SidebarSearch
            onChange={HandleInput}
            value={input}
            placeholder="Search"
          />
        </SidebarHeader>
        <Divider />
        <SidebarHeader sx={{ gap: "0.5rem" }}>
          <Chip label="Label" color="success" variant="outlined" sx={{ p: "1.1rem", fontSize: "1.3rem", fontWeight: "light" }} />
          <Chip label="Unread" variant="outlined" color="success" sx={{ p: "1.1rem", fontSize: "1.3rem", fontWeight: "light" }} />
          <Chip label="Jobs" variant="outlined" color="success" sx={{ p: "1.1rem", fontSize: "1.3rem", fontWeight: "light" }} />
        </SidebarHeader>
        <Divider />
        <SidebarChat>
          <Sidebar>
            <MessageList>
              {(input === "" ? Connections : search).map((elem, index) => (
                <MessageItem
                  key={elem.Connections._id}
                  onClick={() => HandleSelect(elem, index)}
                  selected={Selected?.Connections._id === elem.Connections._id}
                >
                  <NavigationAvatar
                    src={
                      elem.Connections.ProfileTag === ""
                        ? elem.Connections.profilePic
                        : elem.Connections.ProfileTag === "hiring"
                          ? hiring
                          : elem.Connections.ProfileTag === "opentowork"
                            ? opentowork
                            : elem.Connections.profilePic
                    }
                    coverImage={elem.Connections.profilePic}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column", mt: "1rem", ml: "1rem" }}>
                    <Typography variant="h6">{elem.Connections.name}</Typography>
                    <Typography>{elem.Connections.email}</Typography>
                  </Box>
                  {elem.unseen > 0 && (
                    <Badge badgeContent={elem.unseen} color="success" />
                  )}
                </MessageItem>
              ))}
            </MessageList>
          </Sidebar>

          {Selected && isSocketReady ? (
            <Chatarea selected={Selected} ws={ws} />
          ) : (
            <ChatArea>
              <ChatBody>
                <DotLottieReact
                  src="https://lottie.host/023cb542-0bc1-4695-a530-6fd66cfb5eeb/FUaZMxIybk.lottie"
                  loop
                  autoplay
                />
              </ChatBody>
            </ChatArea>
          )}
        </SidebarChat>
      </SidebarOuter>

      <RightSection>
        <AdCard>
          <Box display="flex" alignItems="center">
            <Avatar src="https://logo.clearbit.com/licindia.in" sx={{ mr: '1rem' }} />
            <Box>
              <Typography fontWeight="bold">LIC Housing Finance LTD</Typography>
              <Typography variant="body2">
                Vasu, you might like to follow LIC Housing Finance LTD
              </Typography>
              <Button variant="outlined" size="small" sx={{ mt: '0.5rem' }}>Follow</Button>
            </Box>
          </Box>
        </AdCard>
        <PremiumCard>
          <Typography fontWeight="bold" variant="body1" mb={1}>Invest in Your Network</Typography>
          <Typography variant="body2">✅ Message anyone with InMail</Typography>
          <Typography variant="body2">📈 Get up to 11x more profile views</Typography>
          <Typography variant="body2">📚 Stay ahead with exclusive insights</Typography>
          <Typography variant="body2">🎙️ Access exclusive live talks with industry icons</Typography>
          <Button variant="contained" color="warning" fullWidth sx={{ mt: '1rem' }}>
            Try Premium for ₹0
          </Button>
        </PremiumCard>
      </RightSection>
    </Container>
  );
};

export default Message;
