import { useEffect, useState } from 'react';
import {
  ChatArea,
  ChatFooter,
  ChatHeader,
  ChatBody,
} from './MessageStyles';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import { NavigationAvatar } from '../component';
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import opentowork from '../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png';
import hiring from '../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png';
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import InputEmoji from 'react-input-emoji';

interface Props {
  selected: {
    Connections: {
      _id: string;
      profilePic: string;
      name: string;
      description?: string;
      ProfileTag?: string;
    };
  };
  ws: { current: WebSocket | null };
}

interface MessageType {
  sender: string;
  recipient: string;
  message: string;
  createdAt: string;
  seen: boolean;
}

const Chatarea: React.FC<Props> = ({ selected, ws }) => {
  const [input, SetInput] = useState<string>('');
  const [chat, SetChat] = useState<MessageType[]>([]);

  const { _id, profile, profiletag, name } = useSelector(
    (state: RootState) => state.auth
  );

  const HandleSendMessage = () => {
    if (!ws?.current || ws.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected');
      return;
    }

    ws.current.send(
      JSON.stringify({
        type: 'SendMessage',
        to_id: selected.Connections._id,
        from_id: _id,
        data: input,
      })
    );
    SetInput('');
  };

  const getAllMessages = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/message/${_id}/${selected.Connections._id}`
      );
      SetChat([...res.data.data]);
      setTimeout(() => {
        MarkMessageAsSeen([...res.data.data]);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  const MarkMessageAsSeen = (chats: MessageType[]) => {
    try {
      if (!ws?.current || ws.current.readyState !== WebSocket.OPEN) {
        console.error('WebSocket not connected');
        return;
      }
      const unseenMessages = chats.filter((msg) => msg.seen === false);
      ws.current.send(
        JSON.stringify({
          type: 'seen',
          messages: unseenMessages,
          UserId: _id,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const socket = ws?.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) return;

    const handleMessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.type === 'RecivedMessage') {
        const isCurrentChat =
          (data.data.recipient === _id &&
            data.data.sender === selected.Connections._id) ||
          (data.data.sender === _id &&
            data.data.recipient === selected.Connections._id);
        if (isCurrentChat) {
          SetChat((prevChat) => [...prevChat, data.data]);
          ws.current?.send(
            JSON.stringify({
              type: 'seen',
              messages: [data.data],
              UserId: _id,
            })
          );
        }
      }
    };

    socket.addEventListener('message', handleMessage);
    return () => socket.removeEventListener('message', handleMessage);
  }, [ws?.current, selected.Connections._id, _id]);

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <ChatArea>
      <ChatHeader>
        <Box display="flex" alignItems="center">
          <NavigationAvatar
            sx={{ width: 60, height: 60, marginRight: '0.75rem' }}
            coverImage={selected.Connections.profilePic}
            src={
              !selected.Connections.ProfileTag
                ? selected.Connections.profilePic
                : selected.Connections.ProfileTag === 'hiring'
                ? hiring
                : selected.Connections.ProfileTag === 'opentowork'
                ? opentowork
                : selected.Connections.profilePic
            }
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {selected.Connections.name}
            </Typography>
            <Typography variant="caption" color="gray">
              {selected.Connections.description}
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </ChatHeader>

      <ChatBody>
        {chat.map((elem, index) => {
          const isSender = elem.sender === selected.Connections._id;
          const isNewDate =
            index === 0 ||
            new Date(elem.createdAt).toDateString() !==
              new Date(chat[index - 1].createdAt).toDateString();

          return (
            <div key={index}>
              {isNewDate && (
                <Divider>{new Date(elem.createdAt).toDateString()}</Divider>
              )}
              <Box
                mb={2}
                sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
              >
                <NavigationAvatar
                  sx={{ width: 50, height: 50, marginRight: '0.5rem' }}
                  coverImage={isSender ? selected.Connections.profilePic : profile}
                  src={
                    isSender
                      ? !selected.Connections.ProfileTag
                        ? selected.Connections.profilePic
                        : selected.Connections.ProfileTag === 'hiring'
                        ? hiring
                        : selected.Connections.ProfileTag === 'opentowork'
                        ? opentowork
                        : selected.Connections.profilePic
                      : !profiletag
                      ? profile
                      : profiletag === 'hiring'
                      ? hiring
                      : profiletag === 'opentowork'
                      ? opentowork
                      : profile
                  }
                />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                  >
                    <strong style={{ paddingRight: '0.4rem' }}>
                      {isSender ? selected.Connections.name : name}:
                    </strong>
                    {new Date(elem.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                  <Typography variant="body2">{elem.message}</Typography>
                </Box>
              </Box>
            </div>
          );
        })}
      </ChatBody>

      <ChatFooter sx={{ display: 'flex', alignItems: 'center' }}>
      <InputEmoji
  value={input}
  onChange={SetInput}
  cleanOnEnter
  onEnter={HandleSendMessage}
  placeholder="Type a message"
  shouldReturn={false} // or true depending on whether Enter should return a new line
  shouldConvertEmojiToImage={false} // or true if you want emojis to turn into images
/>
        <Button onClick={HandleSendMessage}>
          <SendIcon fontSize="large" />
        </Button>
      </ChatFooter>
    </ChatArea>
  );
};

export default Chatarea;
