import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from 'styled-components';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png";
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png";
import { NavigationAvatar } from "../component";

// Styled Components
const PopupBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  max-height: 80vh;
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  outline: none;
  display: flex;
  flex-direction: column;
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ConnectionList = styled(List)`
  overflow-y: auto;
  flex-grow: 1;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

const Footer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

// Type Definitions
interface Connection {
  Connections: {
    _id: string;
    name: string;
    profilePic: string;
    ProfileTag?: string;
  };
}

interface PostSharePopupProps {
  open: boolean;
  onClose: () => void;
  connections: Connection[];
}

const PostSharePopup: React.FC<PostSharePopupProps> = ({ open, onClose, connections = [] }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = () => {
    console.log('Post shared with:', selected);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <PopupBox>
        <Header>
          <Typography variant="h6">Share Post</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Header>

        <Typography variant="subtitle2" mb={1}>
          Select connections to share this post with:
        </Typography>

        <ConnectionList>
          {connections.map((conn) => {
            const { _id, name, profilePic, ProfileTag = "" } = conn.Connections;
            const avatarSrc =
              ProfileTag === ""
                ? profilePic
                : ProfileTag === "hiring"
                ? hiring
                : ProfileTag === "opentowork"
                ? opentowork
                : profilePic;

            return (
              <ListItem key={_id} divider>
                <ListItemAvatar>
                  <NavigationAvatar src={avatarSrc} coverImage={profilePic} />
                </ListItemAvatar>
                <ListItemText primary={name} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={() => handleToggle(_id)}
                    checked={selected.includes(_id)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </ConnectionList>

        <Footer>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleShare} disabled={selected.length === 0}>
            Share
          </Button>
        </Footer>
      </PopupBox>
    </Modal>
  );
};

export default PostSharePopup;
