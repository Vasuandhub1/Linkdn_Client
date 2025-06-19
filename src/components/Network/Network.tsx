import { useState, useEffect } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import { NavigationAvatar } from '../component';
import { ProfileCard, Container, Sidebar, Main, ProfileSection, SectionTitle, ProfileInfo, SuperMain } from './Network.Style';
import { NavLink, useNavigate } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import axios from 'axios';
import { BASE_URL } from '../../Baseurl';
import opentowork from "../../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png";
import hiring from "../../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png";
import { useSelector } from 'react-redux';
import type { RootState } from '../../Redux/store';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface InvitationUser {
  _id: string;
  name: string;
  description: string;
  ProfileTag: string;
}

interface Invitation {
  profilePic: string;
  users: InvitationUser;
}

interface SuggestedUser {
  _doc: {
    _id: string;
    name: string;
    description: string;
    profilePic: string;
    ProfileTag: string;
  };
  button: string;
}

const NetworkPage = () => {
  const [users, Setusers] = useState<SuggestedUser[]>([]);
  const [invitations, Setinvitations] = useState<Invitation[]>([]);
  const [connection, Setconnection] = useState<number | null>(null);
  const navigate = useNavigate();
  const { _id } = useSelector((state: RootState) => state.auth);

  const getInvitations = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/network/${_id}`, { withCredentials: true });
      Setinvitations(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const HandleInvitation = async (status: string, recepientId: string, index: number) => {
    try {
      await axios.put(`${BASE_URL}/network/${_id}/${recepientId}/${status}`);
      const temp = [...invitations];
      temp.splice(index, 1);
      Setinvitations(temp);
    } catch (err) {
      console.log(err);
    }
  };

  const Getuser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/network/all/${10}/${0}/${_id}`, { withCredentials: true });
      Setconnection(res.data.data.connections || 0);
      Setusers(res.data.data.temp || []);
    } catch (err) {
      console.log(err);
    }
  };

  const SendRequest = async (Id: string, key: number) => {
    try {
      await axios.post(`${BASE_URL}/network/${_id}`, { recepientId: Id }, { withCredentials: true });
      const temp = [...users];
      temp[key].button = "pending";
      Setusers([...temp]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getInvitations();
    Getuser();
  }, []);

  return (
    <Container>
      <Sidebar>
        <SectionTitle variant="h6">Manage My Network</SectionTitle>
        <List>
          <ListItem  component="button">
            <ListItemIcon><PeopleAltOutlinedIcon /></ListItemIcon>
            <ListItemText onClick={() => navigate("/connections")} primary={`Connections`} />
            <ListItemText primary={`${connection !== null ? connection : "loading..."}`} />
          </ListItem>
          <ListItem component="button">
            <ListItemIcon><GroupsOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItem>
          <ListItem component="button">
            <ListItemIcon><EventOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem component="button">
            <ListItemIcon><BusinessCenterOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Followed Companies" />
          </ListItem>
        </List>
      </Sidebar>

      <SuperMain>
        <Main>
          <SectionTitle variant="h5" padding={"1rem"}>Invitations</SectionTitle>
          {invitations.map((person, idx) => (
            <ProfileSection key={idx}>
              <ProfileInfo>
                <NavigationAvatar
                  style={{ width: "3rem", height: "3rem", border: '3px solid white', margin: '0 auto' }}
                  coverImage={person.profilePic}
                  src={person.users.ProfileTag === '' ? person.profilePic : person.users.ProfileTag === "hiring" ? hiring : person.users.ProfileTag === "opentowork" ? opentowork : person.users.ProfileTag}
                />
                <Box>
                  <Typography variant="subtitle1">{person.users.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{person.users.description}</Typography>
                </Box>
              </ProfileInfo>
              <Box display="flex" gap={1}>
                <Button size="small" variant="contained" onClick={() => { HandleInvitation("confirm", person.users._id, idx) }}>Accept</Button>
                <Button size="small" variant="outlined" onClick={() => { HandleInvitation("rejected", person.users._id, idx) }}>Ignore</Button>
              </Box>
            </ProfileSection>
          ))}
        </Main>

        <Main>
          <SectionTitle variant="h5" padding={"1rem"}>People You May Know</SectionTitle>
          <Box sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: "1.5rem",
          }}>
            {users.length > 0 ? users.map((person, index) => {
              if (person._doc._id === _id) return null;
              return (
                <ProfileCard key={index} sx={{ borderRadius: "1rem", width: "25rem" }}>
                  <Box height={90} borderRadius="1rem 1rem 0 0" bgcolor="#cce0ff" />
                  <NavLink to={"/profile"}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <NavigationAvatar
                        style={{ width: "8rem", height: "8rem", border: '3px solid white', margin: '0 auto', marginTop: '-36px' }}
                        coverImage={person._doc.profilePic}
                        src={person._doc.ProfileTag === '' ? person._doc.profilePic : person._doc.ProfileTag === "hiring" ? hiring : person._doc.ProfileTag === "opentowork" ? opentowork : person._doc.profilePic}
                      />
                    </Box>
                  </NavLink>
                  <Typography variant="h6" mt={1}>{person._doc.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{person._doc.description}</Typography>
                  <Typography variant="caption" color="text.secondary">Indore, Madhya Pradesh</Typography>
                  <Box padding={"2rem"}>
                    {person.button === "pending" ?
                      <Button variant='outlined' color='primary' sx={{ width: "10rem", gap: "0.5rem" }} onClick={() => SendRequest(person._doc._id, index)}>
                        <AccessTimeOutlinedIcon />{person.button}
                      </Button>
                      :
                      <Button variant='contained' color='primary' sx={{ width: "10rem", gap: "0.5rem" }} onClick={() => SendRequest(person._doc._id, index)}>
                        <AddCircleOutlineOutlinedIcon />{person.button}
                      </Button>
                    }
                  </Box>
                </ProfileCard>
              );
            }) : (
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <DotLottieReact
                  src="https://lottie.host/68c7d63e-8ad1-4180-9b4e-a2135c0bcc16/Lg4r3ytDHY.lottie"
                  loop
                  autoplay
                  style={{ width: "45rem" }}
                />
              </Box>
            )}
          </Box>
        </Main>
      </SuperMain>
    </Container>
  );
};

export default NetworkPage;
