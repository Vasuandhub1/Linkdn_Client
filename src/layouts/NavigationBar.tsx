import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Divider,
  Link,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import type { RootState } from '../Redux/store';
import { NavLink, useNavigate } from 'react-router-dom';
import {NavigationAvatar} from "./LayoutComponent"
import opentowork from "../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import axios from 'axios';
import { BASE_URL } from '../Baseurl';
import Badge from '@mui/material/Badge';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: '100%',
}));

const navLinkStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  position: 'relative',
};

const underlineStyle = {
  content: '""',
  position: 'absolute',
  bottom: 0,
  height: '4px',
  width: '100%',
  backgroundColor: 'black',
  borderRadius: '2px',
};



interface AuthLayoutProps {
  children: ReactNode;
}

const NavigationBar: React.FC<AuthLayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {profile,name,profiletag,email,_id}= useSelector((state:RootState)=>state.auth)
  const [selected,Setseleted] = useState("Dashboard")
  const [connection,SetConnection]=useState(0)
  const navigate = useNavigate()



  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const HandlegetNotification = async()=>{
    try{
      const res = await axios.get(`${BASE_URL}/network/notified/${_id}`)
      console.log(res)
      SetConnection(res.data.data)
    }catch(err){
      console.log(err)
    }
  }

  const handleLogout = ()=>{
    const cookiename = document.cookie
    document.cookie = `${cookiename}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    document.location.reload()
  }

  useEffect(()=>{
    HandlegetNotification()
  },[])

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left - Logo and Search */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                color: '#0077b5',
                fontWeight: 'bold',
                marginRight: 2,
              }}
            >
              LinkedIn
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>

          {/* Center - Navigation Icons */}
         

<Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
  <NavLink to="/Dashboard" style={{textDecoration:"none"}} >
    {({ isActive }) => (
      <Box sx={navLinkStyles}>
        <IconButton disableRipple>
          <HomeIcon sx={{ color: isActive ? "black" : "gray" }} />
        </IconButton>
        <Typography sx={{ fontSize: "15px", color: isActive ? "black" : "gray" }}>
          Home
        </Typography>
        {isActive && <Box sx={underlineStyle} />}
      </Box>
    )}
  </NavLink>

  <NavLink to="/networks" style={{textDecoration:"none"}} >
    {({ isActive }) => (
      <Box sx={navLinkStyles}>
        <IconButton disableRipple>
           <Badge badgeContent={connection?connection:null} invisible={connection>0?false:true} color="primary">
          <PeopleAltOutlinedIcon sx={{ color: isActive ? "black" : "gray" }} />
          </Badge>
        </IconButton>
        <Typography sx={{ fontSize: "15px", color: isActive ? "black" : "gray" }}>
          Connections
        </Typography>
        {isActive && <Box sx={underlineStyle} />}
      </Box>
    )}
  </NavLink>

  <NavLink to="/jobs" style={{textDecoration:"none"}} >
    {({ isActive }) => (
      <Box sx={navLinkStyles}>
        <IconButton disableRipple>
          <BusinessCenterIcon sx={{ color: isActive ? "black" : "gray" }} />
        </IconButton>
        <Typography sx={{ fontSize: "15px", color: isActive ? "black" : "gray" }}>
          Jobs
        </Typography>
        {isActive && <Box sx={underlineStyle} />}
      </Box>
    )}
  </NavLink>

  <NavLink to="/message" style={{textDecoration:"none"}} >
    {({ isActive }) => (
      <Box sx={navLinkStyles}>
        <IconButton disableRipple>
          <ChatIcon sx={{ color: isActive ? "black" : "gray" }} />
        </IconButton>
        <Typography sx={{ fontSize: "15px", color: isActive ? "black" : "gray", }}>
          Chats
        </Typography>
        {isActive && <Box sx={underlineStyle} />}
      </Box>
    )}
  </NavLink>

  <NavLink to="/notifications" style={{textDecoration:"none"}} >
    {({ isActive }) => (
      <Box sx={navLinkStyles}>
        <IconButton disableRipple>
          <NotificationsIcon sx={{ color: isActive ? "black" : "gray" }} />
        </IconButton>
        <Typography sx={{ fontSize: "15px", color: isActive ? "black" : "gray" }}>
          Notification
        </Typography>
        {isActive && <Box sx={underlineStyle} />}
      </Box>
    )}
  </NavLink>
</Box>



          {/* Right - User Avatar and Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
           
            <Typography variant="body2" color="textSecondary">
              {name}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <NavigationAvatar
              coverImage={profile}
              alt="Vasu Singh"
              src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
              sx={{ marginRight: 1 }}
            />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 4,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                  mt: 1.5,
                  borderRadius: 2,
                  minWidth: 240,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Box display="flex" alignItems="center">
                  <NavigationAvatar
                    coverImage={profile}
                    alt="Vasu Singh"
                    src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
                    sx={{ marginRight: 1 }}
                      />
                  <Box ml={1}>
                    <Typography fontWeight="bold" variant="body1">
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <MenuItem onClick={()=>navigate("/profile")}>
                <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                View Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
                Settings & Privacy
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <HelpIcon fontSize="small" sx={{ mr: 1 }} />
                Help
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
};

export default NavigationBar;
