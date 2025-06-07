import React, { ReactNode, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import {NavigationAvatar} from "./LayoutComponent"
import opentowork from "../assets/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
import hiring from "../assets/AAYQAQSOAAgAAQAAAAAAABy3-hIQRcT8QpykdK6OdWi7yQ.png"

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

interface AuthLayoutProps {
  children: ReactNode;
}

const NavigationBar: React.FC<AuthLayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {profile,name,profiletag}= useSelector((state:RootState)=>state.auth)
  const navigate = useNavigate()



  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = ()=>{
    const cookiename = document.cookie
    document.cookie = `${cookiename}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    document.location.reload()
  }

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
            <IconButton onClick={()=>navigate("/Dashboard")}  sx={{ display: 'flex', flexDirection:"column",fontSize:"15px" }}>
              <HomeIcon />
              Home
            </IconButton>
            <IconButton sx={{ display: 'flex', flexDirection:"column",fontSize:"15px" }}>
              <BusinessCenterIcon />
              Jobs
            </IconButton>
            <IconButton sx={{ display: 'flex', flexDirection:"column",fontSize:"15px" }}>
              <ChatIcon />
              Chats
            </IconButton>
            <IconButton sx={{ display: 'flex', flexDirection:"column",fontSize:"15px" }}>
              <NotificationsIcon />
              Notification
            </IconButton>
          </Box>

          {/* Right - User Avatar and Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavigationAvatar
              coverImage={profile}
              alt="Vasu Singh"
              src={profiletag===''?profile:profiletag==="hiring"?hiring:profiletag==="opentowork"?opentowork:profile}
              sx={{ marginRight: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              {name}
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <AccountCircleIcon />
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
                      Vasu Singh
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Full Stack Developer
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
