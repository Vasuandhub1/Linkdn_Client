import React ,{ReactNode} from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Avatar, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SceenWrapper } from '../components/component';

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

const NavigationBar : React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <div>
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', color: '#000000', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left - Logo and Search */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" noWrap sx={{ color: '#0077b5', fontWeight: 'bold', marginRight: 2 }}>
            LinkedIn
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Box>

        {/* Center - Navigation Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <IconButton>
            <HomeIcon />
          </IconButton>
          <IconButton>
            <BusinessCenterIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
        </Box>

        {/* Right - User Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Vasu Singh" src="https://via.placeholder.com/40" sx={{ marginRight: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Me
          </Typography>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    {children}
    </div>
  );
};

export default NavigationBar;
